import { Sequelize } from 'sequelize';
import { sequelize } from '../../../config';
import { Room } from '../../../models/Room';
import { RoomCreationAttributes } from '../../../types/interfaces/room.interface';

class RoomService {
    constructor(private sequelize: Sequelize) { }
    async getAllRooms(): Promise<Room[]> {
        // Logic to get all rooms
         const rooms = await Room.findAll({
              attributes: { exclude: ['isDeleted'] },
              where: { isDeleted: false }
            });
        return rooms;
    }

    async getRoomById(id: number): Promise<Room | null> {
        // Logic to get a room by id
        const room = await Room.findOne({
            where: { id: id, isDeleted: false },
            attributes: { exclude: ['isDeleted'] }
          });
        return room;
        
    }

    async createRoom(roomData: RoomCreationAttributes): Promise<Room> {

        const transaction = await this.sequelize.transaction();
           try {
            
             const user = await Room.create(roomData, { transaction });
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

    async updateRoom(id: number, roomData: Partial<Room>): Promise<Room | null> {

        // Logic to update a room
        const transaction = await this.sequelize.transaction();
        try {
          const room = await Room.findOne({
            where: { id: id, isDeleted: false },
            attributes: { exclude: ['isDeleted'] }
          });
          if (!room) {
            throw new Error('Room not found');
          }
    
          await room.update(roomData, { transaction });
          await transaction.commit();
    
          return room;
        } catch (err) {
          await transaction.rollback();
    
          if (err instanceof Error) {
            throw new Error(err.message);
          } else {
            throw new Error('An unknown error occurred');
          }
        }
    
    }

    async deleteRoom(id: number): Promise<boolean> {
        // Logic to delete a room
        const transaction = await this.sequelize.transaction();
        try {
          const room = await Room.findOne({
            where: { id: id, isDeleted: false },
            attributes: { exclude: ['isDeleted'] }
          });
          if (!room) {
            throw new Error('Room not found');
          }
          room.isDeleted = true;
          await room.save({ transaction });
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

export default new RoomService(sequelize);