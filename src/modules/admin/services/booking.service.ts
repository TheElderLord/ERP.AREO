import { Op, Sequelize } from 'sequelize';
import { sequelize } from '../../../config';
import { Booking } from '../../../models/Booking';
import { BookingCreationAttributes } from '../../../types/interfaces/booking.interface';

class BookingService {
  constructor(private sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  //Get all bookings
  async getAllBookings(): Promise<Booking[]> {
    // Logic to get all bookings
    const bookings = await Booking.findAll({
      attributes: { exclude: ['isDeleted'] },
      where: { isDeleted: false }
    });;
    return bookings;
  }

  //Get booking by id
  async getBookingById(id: number): Promise<Booking | null> {
    // Logic to get a booking by id
    const booking = await Booking.findOne({
      where: { id: id, isDeleted: false },
      attributes: { exclude: ['isDeleted'] }
    });;
    return booking;

  }

  //Create booking

  async createBooking(bookingData: BookingCreationAttributes): Promise<Booking> {
    const transaction = await this.sequelize.transaction();

    try {
      // Check for overlapping bookings
      const overlappingBookings = await Booking.findOne({
        where: {
          roomId: bookingData.roomId,
          [Op.or]: [
            {
              startDate: {
                [Op.between]: [bookingData.startDate, bookingData.endDate],
              },
            },
            {
              endDate: {
                [Op.between]: [bookingData.startDate, bookingData.endDate],
              },
            },
            {
              [Op.and]: [
                { startDate: { [Op.lte]: bookingData.startDate } },
                { endDate: { [Op.gte]: bookingData.endDate } },
              ],
            },
          ],
        },
        transaction,
      });

      if (overlappingBookings) {
        throw new Error('The booking date conflicts with an existing booking for the same room.');
      }

      // Create the booking
      const booking = await Booking.create(bookingData, { transaction });

      await transaction.commit();
      return booking;
    } catch (err) {
      await transaction.rollback();

      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }


  //Update booking

  async updateBooking(id: number, bookingData: Partial<Booking>): Promise<Booking | null> {
    const transaction = await this.sequelize.transaction();
    try {
      // Fetch the booking to be updated
      const booking = await Booking.findByPk(id, { transaction });
      if (!booking) {
        throw new Error('Booking not found');
      }

      // Check if dates are being updated
      const { startDate, endDate, roomId } = bookingData;

      if (startDate || endDate || roomId) {
        const updatedRoomId = roomId || booking.roomId; // Use current roomId if not updated
        const updatedStartDate = startDate || booking.startDate; // Use current startDate if not updated
        const updatedEndDate = endDate || booking.endDate; // Use current endDate if not updated

        // Check for overlapping bookings
        const overlappingBookings = await Booking.findOne({
          where: {
            roomId: updatedRoomId,
            id: { [Op.ne]: id }, // Exclude the current booking
            [Op.or]: [
              {
                startDate: {
                  [Op.between]: [updatedStartDate, updatedEndDate],
                },
              },
              {
                endDate: {
                  [Op.between]: [updatedStartDate, updatedEndDate],
                },
              },
              {
                [Op.and]: [
                  { startDate: { [Op.lte]: updatedStartDate } },
                  { endDate: { [Op.gte]: updatedEndDate } },
                ],
              },
            ],
          },
          transaction,
        });

        if (overlappingBookings) {
          throw new Error('The updated booking dates conflict with an existing booking for the same room.');
        }
      }

      // Update the booking
      await booking.update(bookingData, { transaction });
      await transaction.commit();

      return booking;
    } catch (err) {
      await transaction.rollback();

      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }


  //Delete booking
  async deleteBooking(id: number): Promise<boolean> {
    // Logic to delete a booking
    const transaction = await this.sequelize.transaction();
    try {
      const booking = await Booking.findByPk(id, { transaction });
      if (!booking) {
        throw new Error('booking not found');
      }
      booking.isDeleted = true;
      await booking.save({ transaction });
      await transaction.commit();
      return true;
    } catch (err) {
      await transaction.rollback();
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }
}

export default new BookingService(sequelize);