import { Sequelize } from 'sequelize';
import { User } from '../../../models/User'; // Adjust the import path as necessary
import { UserCreationAttributes } from '../../../types/interfaces/users/user.interface';
import { sequelize } from '../../../config';

class UserService {
  constructor(private sequelize: Sequelize) { }

  //getAllUsers method
  async getAllUsers() {
    const users = await User.findAll({
      attributes: { exclude: ['password', 'isDeleted'] },
      where: { isDeleted: false }
    });
    return users;
  }

  //getUserById method
  async getUserById(userId: number) {
    const user = await User.findOne({
      where: { id: userId, isDeleted: false },
      attributes: { exclude: ['password', 'isDeleted'] }
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  //create method
  async createUser(data: UserCreationAttributes) {
    const transaction = await this.sequelize.transaction();
    try {
      const exist = await User.findOne({ where: { login: data.login } });
      if (exist) {
        throw new Error('User already exist');
      }
      const user = await User.create(data, { transaction });
      await transaction.commit();
      return user;
    } catch (err) {
      await transaction.rollback();

      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }


  //updateUser method
  async updateUser(userId: number, data: Partial<User>) {
    const transaction = await this.sequelize.transaction();

    try {
      const user = await User.findOne({
        where: { id: userId, isDeleted: false },
        attributes: { exclude: ['password'] }
      });
      if (!user) {
        throw new Error('User not found');
      }

      await user.update(data, { transaction });
      await transaction.commit();

      return user;
    } catch (err) {
      await transaction.rollback();

      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }


  //deleteUser method
  async deleteUser(userId: number) {
    const transaction = await this.sequelize.transaction();

    try {
      const user = await User.findOne({
        where: { id: userId, isDeleted: false },
        attributes: { exclude: ['password'] }
      });
      if (!user) {
        throw new Error('User not found');
      }

      user.isDeleted = true;
      await user.save({ transaction });
      await transaction.commit();

      return true;
    } catch (err) {
      await transaction.rollback();

      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

  //get black list
  async getBlackList() {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      where: { isDeleted: false, blacklist: true }
    });
    return users;
  }

  //Add to black list
  async addToBlackList(userId: number) {
    const transaction = await this.sequelize.transaction();

    try {
      const user = await User.findOne({
        where: { id: userId, isDeleted: false },
        attributes: { exclude: ['password'] }
      });
      if (!user) {
        throw new Error('User not found');
      }
      user.blacklist = true;
      await user.save({ transaction });
      await transaction.commit();
      return true;
    } catch (err) {
      await transaction.rollback();

      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }

  //Remove from black list
  async removeFromBlackList(userId: number) {
    const transaction = await this.sequelize.transaction();

    try {
      const user = await User.findOne({
        where: { id: userId, isDeleted: false },
        attributes: { exclude: ['password'] }
      });
      if (!user) {
        throw new Error('User not found');
      }
      user.blacklist = false;
      await user.save({ transaction });
      await transaction.commit();
      return true;
    } catch (err) {
      await transaction.rollback();

      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }



}

export default new UserService(sequelize);