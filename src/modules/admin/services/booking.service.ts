import { Sequelize } from 'sequelize';
import { sequelize } from '../../../config';
import { Booking } from '../../../models/Booking';
import {  BookingCreationAttributes } from '../../../types/interfaces/booking.interface';

class BookingService {
    constructor(private sequelize: Sequelize) { }
    async getAllBookings(): Promise<Booking[]> {
        // Logic to get all bookings
        const bookings = await Booking.findAll({
          attributes: { exclude: ['isDeleted'] },
          where: { isDeleted: false }
        });;
        return bookings;
    }

    async getBookingById(id: number): Promise<Booking | null> {
        // Logic to get a booking by id
        const booking = await Booking.findOne({
          where: { id: id, isDeleted: false },
          attributes: { exclude: ['isDeleted'] }
        });;
        return booking;
        
    }

    async createBooking(bookingData: BookingCreationAttributes): Promise<Booking> {

        const transaction = await this.sequelize.transaction();
           try {
            const overlappingBooking = await Booking.findOne({
              where: {
                isDeleted: false,
                [Sequelize.Op.or]: [
                  {
                    startDate: {
                      [Sequelize.Op.between]: [bookingData.startDate, bookingData.endDate]
                    }
                  },
                  {
                    endDate: {
                      [Sequelize.Op.between]: [bookingData.startDate, bookingData.endDate]
                    }
                  },
                  {
                    [Sequelize.Op.and]: [
                      {
                        startDate: {
                          [Sequelize.Op.lte]: bookingData.startDate
                        }
                      },
                      {
                        endDate: {
                          [Sequelize.Op.gte]: bookingData.endDate
                        }
                      }
                    ]
                  }
                ]
              },
              transaction
            });

            if (overlappingBooking) {
              throw new Error('Booking dates overlap with an existing booking');
            }
             const user = await Booking.create(bookingData, { transaction });
             await transaction.commit();
             return user;
           } catch (err) {
             await transaction.rollback();
         
             if (err instanceof Error) {
               throw new Error(err.message);
             } else {
               throw new Error('An unknown error occurred');
             }
           }
    }

    async updateBooking(id: number, bookingData: Partial<Booking>): Promise<Booking | null> {

        // Logic to update a booking
        const transaction = await this.sequelize.transaction();
        try {
          const booking = await Booking.findByPk(id, { transaction });
          if (!booking) {
            throw new Error('booking not found');
          }
    
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

    async deleteBooking(id: number): Promise<boolean> {
        // Logic to delete a booking
        const transaction = await this.sequelize.transaction();
        try {
          const booking = await Booking.findByPk(id, { transaction });
          if (!booking) {
            throw new Error('booking not found');
          }
    
          await booking.destroy({ transaction });
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