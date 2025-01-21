// src/interfaces/booking.ts
import { Optional } from 'sequelize';

interface Booking {
    id: number;
    userId: number;
    roomId: number;
    startDate: Date;
    endDate: Date;
    comments?: string;
    isPaid: boolean;
    given: number;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;

}


export interface BookingAttributes {
  id: number;
  userId: number;
  roomId: number;
  startDate: Date;
  endDate: Date;
  comments?: string;
  isPaid: boolean;
  given: number;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookingCreationAttributes
  // Make fields that are auto-incremented or auto-managed optional
  extends Optional<BookingAttributes, 'id' | 'createdAt' | 'updatedAt'> {}
