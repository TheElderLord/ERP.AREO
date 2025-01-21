import { Optional } from "sequelize";
import { Role } from "../../enums/role.enum";
import { UserStatus } from "../../enums/user-status.enum";

interface User {
    id: number;
    name: string;
    surname: string;
    login: string;
    password?: string;
    status?: UserStatus;
    number?: string;
    comments?: string;
    blacklist: boolean;
    role: Role;
    isDeleted: boolean;
    // Timestamps
    createdAt: Date;
    updatedAt: Date;
}

export interface UserAttributes {
    id: number;
    name: string;
    surname: string;
    login: string;
    password?: string;
    status?: UserStatus;
    number?: string;
    comments?: string;
    blacklist: boolean;
    role: Role;
    isDeleted: boolean;
  
    createdAt: Date;
    updatedAt: Date;
  }
  
  // For creation, we make any auto-increment or default fields optional
  export interface UserCreationAttributes
    extends Optional<UserAttributes, 'id' |  'createdAt' | 'updatedAt'> {}
  