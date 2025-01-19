import { Sequelize } from 'sequelize';
import { sequelize } from '../../../config';
import { Booking } from '../../../models/Booking';
import {  BookingCreationAttributes } from '../../../types/interfaces/booking.interface';

class BookingService {
    constructor(private sequelize: Sequelize) { }
    async getAllbookings(): Promise<Booking[]> {
        // Logic to get all bookings
        const bookings = await Booking.findAll();
        return bookings;
    }

    async getbookingById(id: number): Promise<Booking | null> {
        // Logic to get a booking by id
        const booking = await Booking.findByPk(id);
        return booking;
        
    }

    async createbooking(bookingData: BookingCreationAttributes): Promise<Booking> {

        const transaction = await this.sequelize.transaction();
           try {
            
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

    async updatebooking(id: number, bookingData: Partial<Booking>): Promise<Booking | null> {

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