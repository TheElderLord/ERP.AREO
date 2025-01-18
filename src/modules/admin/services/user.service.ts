import { Sequelize } from 'sequelize';
import { User } from '../../../models/User'; // Adjust the import path as necessary

class UserService {
  constructor(private sequelize: Sequelize) { }

  async updateUser(userId: number, data: Partial<User>) {
    const transaction = await this.sequelize.transaction();

    try {
      const user = await User.findByPk(userId, { transaction });
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

  async getUserById(userId: number) {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
  async deleteUser(userId: number) {
    const transaction = await this.sequelize.transaction();

    try {
      const user = await User.findByPk(userId, { transaction });
      if (!user) {
        throw new Error('User not found');
      }

      await user.destroy({ transaction });
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
  async getAllUsers() {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });

    return users;
  }
}