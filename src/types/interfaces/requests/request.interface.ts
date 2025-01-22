
import { Optional } from 'sequelize';
import { RequestStatus } from '../../enums/request-status.enum';

interface Request {
  id: number;
  status: RequestStatus;
  roomId: number;
  phone_number: string;

  isDeleted: boolean;
  isCompleted: boolean;
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}


export interface RequestAttributes {
  id: number;

  status: RequestStatus;
  roomId: number;
  phone_number: string;


  isDeleted: boolean;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface RequestCreationAttributes
  extends Optional<RequestAttributes, 'id' | 'createdAt' | 'updatedAt'> { }
