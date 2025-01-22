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
import { RequestAttributes, RequestCreationAttributes } from '../types/interfaces/requests/request.interface';


import { RequestStatus } from '../types/enums/request-status.enum';
import { Room } from './Room';

@Table({
  tableName: 'requests',
  timestamps: true, // This enables createdAt & updatedAt automatically
})
export class Request extends Model<RequestAttributes, RequestCreationAttributes> {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status!: RequestStatus;

  @ForeignKey(() => Room)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  roomId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone_number!: String;

  @BelongsTo(() => Room)
  room?: Room;

  



  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isDeleted!: boolean;
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isCompleted!: boolean;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt!: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt!: Date;
}
