
import { Optional } from 'sequelize';
import { RequestStatus } from '../enums/request-status.enum';

interface Request {
    id: number;
    userId: number;
    status: RequestStatus;
    requestedDate: Date;
    requestedTime: string;

    // Timestamps
    createdAt: Date;
    updatedAt: Date;
}


export interface RequestAttributes {
  id: number;
  userId: number;
  status: RequestStatus;
  requestedDate: Date;
  requestedTime: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface RequestCreationAttributes
  extends Optional<RequestAttributes, 'id' | 'createdAt' | 'updatedAt'> {}
