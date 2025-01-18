import {
    Model,
    Table,
    Column,
    DataType,
    HasMany,
    BeforeCreate,
    BeforeUpdate,
} from 'sequelize-typescript';
import bcrypt from 'bcryptjs';
import { Optional } from 'sequelize';

// Import your new interfaces
import { UserAttributes, UserCreationAttributes } from '../types/interfaces/user.interface'; // <— Adjust import path
import { Role } from '../types/enums/role.enum'; // or wherever Role is defined
import { Booking } from './Booking';
import { Request } from './Request';
import { UserStatus } from '../types/enums/user-status.enum';


@Table({
    tableName: 'users',
    timestamps: true, // Automatically adds "createdAt" and "updatedAt"
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
    // 1) ID
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    })
    id!: number;

    // 2) Name
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;

    // 3) Surname
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    surname!: string;

    // 4) IIN (optional)
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    login: string;

    // 5) Status (optional)
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    status?: UserStatus;

    // 6) Number (optional)
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    number?: string;

    // 7) DateCreated 
    // If you want a custom "dateCreated" column (separate from Sequelize's createdAt):
    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    dateCreated!: Date;

    // 8) Comments (optional)
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    comments?: string;

    // 9) Blacklist (boolean)
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    })
    blacklist!: boolean;

    // 10) Role
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    role!: Role;

    // Add a password field if your business logic requires it
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password!: string;

    // Timestamps (createdAt, updatedAt) will be automatically added 
    // since timestamps: true is set. 
    // You can override their column names with e.g.:
    // @CreatedAt
    // @Column({ field: 'created_at' })
    // createdAt!: Date;

    // Or just rely on the default naming
    // updatedAt!: Date;

    // Relations
    @HasMany(() => Booking)
    bookings!: Booking[];

    @HasMany(() => Request)
    requests!: Request[];

    // Hooks
    @BeforeCreate
    @BeforeUpdate
    static async hashPassword(instance: User) {
        if (instance.changed('password')) {
            const salt = await bcrypt.genSalt(12);
            instance.password = await bcrypt.hash(instance.password, salt);
        }
    }

    // Custom instance methods
    async comparePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}

