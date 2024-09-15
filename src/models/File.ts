// src/models/File.ts
import {
    Model,
    Table,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
  } from 'sequelize-typescript';
  import User from './User';
  import { Optional } from 'sequelize';
  
  interface FileAttributes {
    id: number;
    userId: number;
    name: string;
    extension: string;
    mimeType: string;
    size: number;
    uploadDate: Date;
  }
  
  interface FileCreationAttributes extends Optional<FileAttributes, 'id' | 'uploadDate'> {}
  
  @Table({
    tableName: 'files',
    timestamps: false,
  })
  class File extends Model<FileAttributes, FileCreationAttributes> {
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
      type: DataType.STRING,
      allowNull: false,
    })
    name!: string;
  
    @Column(DataType.STRING(10))
    extension!: string;
  
    @Column(DataType.STRING(50))
    mimeType!: string;
  
    @Column(DataType.BIGINT)
    size!: number;
  
    @Column({
      type: DataType.DATE,
      defaultValue: DataType.NOW,
    })
    uploadDate!: Date;
  
    @BelongsTo(() => User)
    user!: User;
  }
  
  export default File;
  