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

}

export default new RoomService(sequelize);