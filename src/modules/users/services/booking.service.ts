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
}

  //Create booking

  

export default new BookingService(sequelize);