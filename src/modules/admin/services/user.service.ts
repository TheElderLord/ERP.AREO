import { Sequelize } from 'sequelize';
import { User } from '../../../models/User'; // Adjust the import path as necessary
import { UserCreationAttributes } from '../../../types/interfaces/users/user.interface';
import { sequelize } from '../../../config';

class UserService {
  constructor(private sequelize: Sequelize) { }

  //getAllUsers method
  async getAllUsers() {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });

    return users;
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

  //create method
  async createUser(data: UserCreationAttributes) {
    const transaction = await this.sequelize.transaction();
    try {
      const exist = await User.findOne({ where: { login:data.login } });
      if(exist){
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
  
}

export default new UserService(sequelize);