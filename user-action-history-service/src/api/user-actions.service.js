import AppDataSource from "../data-source";
import UserActon from "../entity/UserActionHistory.entity";
import usersActionQueryBuilder from "./utils";

class UserActionsService {
    constructor() {
        this.userActionsRepository = AppDataSource.getRepository(UserActon);
    }

    async getOne(userId) {
        const userActions = await this.userActionsRepository.findOne({
            userId
        });

        if (!userActions) {
            throw new Error("User not found");
        }

        return userActions;
    }


    async getAll(query) {
        const {page, limit} = query;

        const queryBuilder  = usersActionQueryBuilder(query)


        const [usersActions, total] = await queryBuilder.getManyAndCount();

        return {
            usersActions,
            page,
            limit,
            totalPage: total,
        }

    }
}

const userActionsService = new UserActionsService();
module.exports = userActionsService;