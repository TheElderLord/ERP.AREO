// src/models/Token.ts
import {
    Model,
    Table,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
    DefaultScope,
  } from 'sequelize-typescript';
  import User from './User';
  import { Optional } from 'sequelize';
  
  interface TokenAttributes {
    id: number;
    userId: number;
    token: string;
    expiresAt: Date;
    revoked: boolean;
    deviceId: string | null;
  }
  
  interface TokenCreationAttributes extends Optional<TokenAttributes, 'id' | 'revoked'> {}
  
  @DefaultScope(() => ({
    attributes: { exclude: ['token'] },
  }))
  @Table({
    tableName: 'tokens',
    timestamps: false,
  })
  class Token extends Model<TokenAttributes, TokenCreationAttributes> {
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
  
    @Column({
      type: DataType.STRING(500),
      allowNull: false,
    })
    token!: string;
  
    @Column({
      type: DataType.DATE,
      allowNull: false,
    })
    expiresAt!: Date;
  
    @Column({
      type: DataType.BOOLEAN,
      defaultValue: false,
    })
    revoked!: boolean;
  
    @Column(DataType.STRING)
    deviceId!: string;
  
    @BelongsTo(() => User)
    user!: User;
  }
  
  export default Token;
  