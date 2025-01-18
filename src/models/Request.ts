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
  import { RequestAttributes, RequestCreationAttributes } from '../types/interfaces/request.interface';
  
  // Example: If you have a User model
  import { User } from './User';
import { RequestStatus } from '../types/enums/request-status.enum';
  
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
  
    @ForeignKey(() => User)
    @Column({
      type: DataType.INTEGER.UNSIGNED,
      allowNull: false,
    })
    userId!: number;
  
    @BelongsTo(() => User)
    user?: User;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    status!: RequestStatus;
  
    @Column({
      type: DataType.DATE,
      allowNull: false,
    })
    requestedDate!: Date;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    requestedTime!: string;
  
    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt!: Date;
  
    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt!: Date;
  }
  