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
  