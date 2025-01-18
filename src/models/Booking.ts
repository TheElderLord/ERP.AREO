// src/models/Booking.ts

import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    ForeignKey,
    BelongsTo,
  } from 'sequelize-typescript';
  import { BookingAttributes, BookingCreationAttributes } from '../types/interfaces/booking.interface';
  
  // Assuming you already have User and Room models:
  import { User } from './User';
  import { Room } from './Room';
  
  @Table({
    tableName: 'bookings',
    timestamps: true, // Automatically adds createdAt & updatedAt
  })
  export class Booking extends Model<BookingAttributes, BookingCreationAttributes> {
    @Column({
      type: DataType.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    })
    id!: number;
  
    // Foreign Key referencing a User
    @ForeignKey(() => User)
    @Column({
      type: DataType.INTEGER.UNSIGNED,
      allowNull: false,
    })
    userId!: number;
  
    @BelongsTo(() => User)
    user?: User;
  
    // Foreign Key referencing a Room
    @ForeignKey(() => Room)
    @Column({
      type: DataType.INTEGER.UNSIGNED,
      allowNull: false,
    })
    roomId!: number;
  
    @BelongsTo(() => Room)
    room?: Room;
  
    @Column({
      type: DataType.DATE,
      allowNull: false,
    })
    startDate!: Date;
  
    @Column({
      type: DataType.DATE,
      allowNull: false,
    })
    endDate!: Date;
  
    @Column({
      type: DataType.TEXT,  // or DataType.STRING if you expect short comments
      allowNull: true,
    })
    comments?: string;
  
    @Column({
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    })
    isPaid!: boolean;
  
    @Column({
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    })
    given!: boolean;
  
    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt!: Date;
  
    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt!: Date;
  }
  