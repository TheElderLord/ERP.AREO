// src/models/User.ts
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
  import File from './File';
  import Token from './Token';
  import { Optional } from 'sequelize';
  
  interface UserAttributes {
    id: number;
    identifier: string;
    password: string;
  }
  
  interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}
  
  @Table({
    tableName: 'users',
    timestamps: true,
  })
  class User extends Model<UserAttributes, UserCreationAttributes> {
    @Column({
      type: DataType.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    })
    id!: number;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmailOrPhone(value: string) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
          if (!emailRegex.test(value) && !phoneRegex.test(value)) {
            throw new Error('Identifier must be a valid email or phone number');
          }
        },
      },
    })
    identifier!: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    password!: string;
  
    @HasMany(() => File)
    files!: File[];
  
    @HasMany(() => Token)
    tokens!: Token[];
  
    /**
     * Hashes the user's password before creating or updating the user.
     * This method is automatically called by Sequelize hooks.
     * @param instance - The instance of the User being saved.
     */
    @BeforeCreate
    @BeforeUpdate
    static async hashPassword(instance: User) {
      if (instance.changed('password')) {
        const salt = await bcrypt.genSalt(12);
        instance.password = await bcrypt.hash(instance.password, salt);
      }
    }
  
    /**
     * Compares a plain text password with the hashed password.
     * @param password - The plain text password to compare.
     * @returns A promise that resolves to true if passwords match, false otherwise.
     */
    async comparePassword(password: string): Promise<boolean> {
      return bcrypt.compare(password, this.password);
    }
  }
  
  export default User;
  