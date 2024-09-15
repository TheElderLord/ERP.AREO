// src/services/authService.ts
import User from '../models/User';
import Token from '../models/Token';
import { generateAccessToken, generateRefreshToken } from '../utils/tokenUtils';
import parseDuration from '../utils/parseDuration';
import jwt from 'jsonwebtoken';

class AuthService {
  async register(identifier: string, password: string, deviceId?: string) {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { identifier } });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create new user
    const user = await User.create({ identifier, password });

    // Generate tokens
    const accessToken = generateAccessToken(user, deviceId);
    const refreshToken = generateRefreshToken(user, deviceId);

    // Save refresh token to database
    const expiresInMilliseconds = parseDuration(process.env.REFRESH_TOKEN_EXPIRY || '7d');
    await Token.create({
      userId: user.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + expiresInMilliseconds),
      deviceId: deviceId || null, // Assign null if undefined
    });

    return { accessToken, refreshToken };
  }

  async login(identifier: string, password: string, deviceId?: string) {
    // Find user by identifier
    const user = await User.findOne({ where: { identifier } });
    if (!user) {
      throw new Error('User not found');
    }

    // Verify password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      throw new Error('Incorrect password');
    }

    // Generate tokens
    const accessToken = generateAccessToken(user, deviceId);
    const refreshToken = generateRefreshToken(user, deviceId);

    // Save refresh token to database
    const expiresInMilliseconds = parseDuration(process.env.REFRESH_TOKEN_EXPIRY || '7d');
    await Token.create({
      userId: user.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + expiresInMilliseconds),
      deviceId: deviceId || null, // Assign null if undefined
    });

    return { accessToken, refreshToken };
  }

  async refreshAccessToken(refreshToken: string, deviceId?: string) {
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
    const newAccessToken = generateAccessToken(user, deviceId);

    return { accessToken: newAccessToken };
  }

  async logout(accessToken: string) {
    // Revoke the access token
    await Token.update({ revoked: true }, { where: { token: accessToken } });
  }
}

export default new AuthService();
