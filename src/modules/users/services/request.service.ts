import { Sequelize } from 'sequelize';
import { sequelize } from '../../../config';
import { Request } from '../../../models/Request';
import { RequestCreationAttributes } from '../../../types/interfaces/requests/request.interface';

class RequestService {
    constructor(private sequelize: Sequelize) { }


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
}

export default new RequestService(sequelize);
