// src/types/interfaces/room.ts

import { Optional } from 'sequelize';

interface Room {
    id: number;
    title: string;
    location?: string;
    price?: number;
    floor?: number;
    complex?: string;
    amount?: number;
    square?: number;
    kitchenSquare?: number;
    conditions?: string;
    latitude?: number;
    longitude?: number;
    peopleNum?: number;
    bedNum?: number;
    description?: string;
    images?: string[];
    smallImages?: string[];
    shortName?: string;
    isDeleted: boolean;
    // Timestamps
    createdAt: Date;
    updatedAt: Date;
}



export interface RoomAttributes {
  id: number;
  title: string;
  location?: string;
  price?: number;
  floor?: number;
  complex?: string;
  amount?: number;
  square?: number;
  kitchenSquare?: number;
  conditions?: string;
  latitude?: number;
  longitude?: number;
  peopleNum?: number;
  bedNum?: number;
  description?: string;
  images?: string[];
  smallImages?: string[];
  shortName?: string;
  isDeleted: boolean;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

// For creation, make `id` optional (and any other fields that are auto-generated or defaulted)
export interface RoomCreationAttributes
  extends Optional<RoomAttributes, 'id' | 'createdAt' | 'updatedAt'> {}
