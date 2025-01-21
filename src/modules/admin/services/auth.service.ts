// src/services/authService.ts
import { User}  from '../../../models/User';
import Token from '../../../models/Token';
import { generateAccessToken, generateRefreshToken } from '../../../utils/tokenUtils';
import parseDuration from '../../../utils/parseDuration';
import jwt from 'jsonwebtoken';

class AuthService {
  

  async login(login: string, password: string) {
    // Find user by identifier
    const user = await User.findOne(
      {
        where: { login, isDeleted: false }, 
      }
    );
    if (!user) {
      throw new Error('User not found');
    }

    // Verify password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      throw new Error('Incorrect password');
    }

    // Generate tokens
    
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Save refresh token to database
    const expiresInMilliseconds = parseDuration(process.env.REFRESH_TOKEN_EXPIRY || '7d');
    await Token.create({
      userId: user.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + expiresInMilliseconds),
       });

    return { accessToken, refreshToken };
  }

  async refreshAccessToken(refreshToken: string, login:string) {
    // Verify refresh token
    const payload: any = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string);

    // Check if refresh token is revoked
    const tokenRecord = await Token.findOne({
      where: { token: refreshToken, revoked: false },
    });
    if (!tokenRecord) {
      throw new Error('Refresh token revoked or invalid');
    }

    // Find user
    const user = await User.findByPk(payload.id);
    if (!user) {
      throw new Error('User not found');
    }

    // Generate new access token
    const newAccessToken = generateAccessToken(user);

    return { accessToken: newAccessToken };
  }

  async logout(accessToken: string) {
    // Revoke the access token
    await Token.update({ revoked: true }, { where: { token: accessToken } });
  }
}

export default new AuthService();
