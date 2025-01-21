// src/controllers/userController.ts
import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import logger from '../../../utils/logger';
import roomService from '../services/room.service';


export const getRoomsRequestHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rooms = await roomService.getAllRooms();
        res.json({
            msg: 'All Rooms',
            data: rooms
        });
    } catch (error) {
        logger.error(`Get Room Error: ${getErrorMessage(error)}`);
        next(error);
    }
});

export const getRoomByIdHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roomId = Number(req.params.id);
        // const userService = new UserService(sequelize);
        // console.log(req.params)
        const room = await roomService.getRoomById(roomId);
        if(!room) {
            res.status(404).json({msg: 'Room not found'});
            return;
        }

        res.json(room);
    } catch (error) {
        logger.error(`Get Room Error: ${getErrorMessage(error)}`);
        next(error);
    }
});



function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    return String(error);
}
