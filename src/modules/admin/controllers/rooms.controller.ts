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


export const createRoomRequestHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const images = req.files ? (req.files as Express.Multer.File[]).map((file) => file.originalname).join(",") : "Not specified";
        req.body.images = images;
        
        const createdRoom = await roomService.createRoom(req.body);
        // const updatedUser = await userService.createUser();
        res.json(createdRoom);
    } catch (error) {
        logger.error(`Create Room Error: ${getErrorMessage(error)}`);
        next(error);
    }
});

export const updateRoomRequestHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roomId = Number(req.params.id);
        // console.log(req.files);
        const images = req.files ? (req.files as Express.Multer.File[]).map((file) => file.originalname).join(",") : "Not specified";
        req.body.smallImages = images;
        const updatedRoom = await roomService.updateRoom(roomId, req.body);
        res.json(updatedRoom);
    } catch (error) {
        logger.error(`Update Room Error: ${getErrorMessage(error)}`);
        next(error);
    }
});

export const deleteRoomRequestHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roomId = Number(req.params.id);
        // console.log(req.files);
        const room = await roomService.deleteRoom(roomId);
        if(room) {
            res.json({msg: 'Room deleted successfully'});
            return;
        }
        res.json(room);
    } catch (error) {
        logger.error(`Update User Info Error: ${getErrorMessage(error)}`);
        next(error);
    }
})


function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    return String(error);
}
