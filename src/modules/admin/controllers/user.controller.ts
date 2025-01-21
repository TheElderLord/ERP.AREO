// src/controllers/userController.ts
import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import UserService from '../services/user.service';
import logger from '../../../utils/logger';
import { User } from '../../../models/User';

export const getUserByIdHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.params.id);
        // const userService = new UserService(sequelize);
        // console.log(req.params)
        const user = await UserService.getUserById(userId);
        if (user) {
            res.json(user);
            return; 
        }
        res.status(404).json({ msg: 'User not found' });
    } catch (error) {
        logger.error(`Get User Info Error: ${getErrorMessage(error)}`);
        next(error);
    }
});
export const getUsersRequestHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: User[] = await UserService.getAllUsers();
        res.json({
            msg: 'All Users',
            data: user
        });
    } catch (error) {
        logger.error(`Get User Info Error: ${getErrorMessage(error)}`);
        next(error);
    }
});


export const createUserRequestHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const createdUser = await UserService.createUser(req.body);
        // const updatedUser = await userService.createUser();
        res.json(createdUser);
    } catch (error) {
        logger.error(`Create User Info Error: ${getErrorMessage(error)}`);
        next(error);
    }
});


export const updateUserRequestHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.params.id);
        // const userService = new UserService(sequelize);

        const updatedUser = await UserService.updateUser(userId, req.body);
        res.json(updatedUser);
    } catch (error) {
        logger.error(`Update User Info Error: ${getErrorMessage(error)}`);
        next(error);
    }
});

export const deleteUserRequestHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.params.id);


        const deletedUser = await UserService.deleteUser(userId);
        res.json(deletedUser);
    } catch (error) {
        logger.error(`Delete User Info Error: ${getErrorMessage(error)}`);
        next(error);
    }
});

export const getBlackListREquestHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blackList = await UserService.getBlackList();
        res.json(blackList);
    } catch (error) {
        logger.error(`Get BlackList Info Error: ${getErrorMessage(error)}`);
        next(error);
    }
});

export const addToBlackListRequestHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.params.id);
        const user = await UserService.addToBlackList(userId);
        res.json(user);
    } catch (error) {
        logger.error(`Add to BlackList Info Error: ${getErrorMessage(error)}`);
        next(error);
    }
});

export const removeFromBlackListRequestHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.params.id);
        const user = await UserService.removeFromBlackList(userId);
        res.json(user);
    } catch (error) {
        logger.error(`Remove from BlackList Info Error: ${getErrorMessage(error)}`);
        next(error);
    }
});



function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    return String(error);
}
