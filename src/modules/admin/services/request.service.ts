import { Sequelize } from 'sequelize';
import { sequelize } from '../../../config';
import { Request } from '../../../models/Request';
import { RequestCreationAttributes } from '../../../types/interfaces/requests/request.interface';

class RequestService {
    constructor(private sequelize: Sequelize) { }

    async getAllRequests(): Promise<Request[]> {
        // Logic to get all requests
        const requests = await Request.findAll({
            attributes: { exclude: ['isDeleted'] },
            where: { isDeleted: false }
        });
        return requests;
    }

    async getRequestById(id: number): Promise<Request | null> {
        // Logic to get a request by id
        const request = await Request.findOne({
            where: { id: id, isDeleted: false },
            attributes: { exclude: ['isDeleted'] }
        });
        return request;
    }

    async createRequest(requestData: RequestCreationAttributes): Promise<Request> {
        const transaction = await this.sequelize.transaction();
        try {
            const request = await Request.create(requestData, { transaction });
            await transaction.commit();
            return request;
        } catch (err) {
            await transaction.rollback();
            if (err instanceof Error) {
                throw new Error(err.message);
            } else {
                throw new Error('An unknown error occurred');
            }
        }
    }

    async deleteRequest(id: number): Promise<boolean> {
        // Logic to delete a request
        const transaction = await this.sequelize.transaction();
        try {
            const request = await Request.findOne({
                where: { id: id, isDeleted: false },
                attributes: { exclude: ['isDeleted'] }
            });
            if (!request) {
                throw new Error('Request not found');
            }
            request.isDeleted = true;
            await request.save({ transaction });
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

export default new RequestService(sequelize);
