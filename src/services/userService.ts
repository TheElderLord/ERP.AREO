// src/services/userService.ts
import User from '../models/User';

class UserService {
  async getUserById(userId: number) {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async updateUser(userId: number, data: Partial<User>) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }
    await user.update(data);
    return user;
  }

  // Additional user-related methods can be added here
}

export default new UserService();
