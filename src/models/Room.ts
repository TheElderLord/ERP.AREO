// src/models/Room.ts

import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from 'sequelize-typescript';
import { RoomAttributes, RoomCreationAttributes } from '../types/interfaces/room.interface';
import { Booking } from './Booking';

@Table({
  tableName: 'rooms',
  timestamps: true, // This automatically adds `createdAt` and `updatedAt` columns.
})
export class Room extends Model<RoomAttributes, RoomCreationAttributes> {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false, // Because `title` is required in your interface
  })
  title!: string;

  @Column(DataType.STRING)
  location?: string;

  @Column(DataType.DECIMAL)
  price?: number;

  @Column(DataType.INTEGER)
  floor?: number;

  @Column(DataType.STRING)
  complex?: string;

  @Column(DataType.INTEGER)
  amount?: number;

  @Column(DataType.INTEGER)
  square?: number;

  @Column(DataType.INTEGER)
  kitchenSquare?: number;

  @Column(DataType.STRING)
  conditions?: string;

  @Column(DataType.DECIMAL)
  latitude?: number;

  @Column(DataType.DECIMAL)
  longitude?: number;

  @Column(DataType.INTEGER)
  peopleNum?: number;

  @Column(DataType.INTEGER)
  bedNum?: number;

  @Column(DataType.TEXT)
  description?: string;

  /**
   * For arrays (like `images`), you have a few options:
   * - Store as a text field and parse/stringify to JSON
   * - Use a Postgres array type if using PostgreSQL
   */
  @Column(DataType.TEXT) // e.g., store JSON-encoded array
  images?: string[];

  @Column(DataType.TEXT)
  smallImages?: string[];

  @Column(DataType.STRING)
  shortName?: string;

  @HasMany(() => Booking)
  bookings!: Booking[];


  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isDeleted!: boolean;

  // If you're relying on Sequelize's auto-managed timestamps, you can do this:
  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt!: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt!: Date;
}
