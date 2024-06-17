import {Repository} from "typeorm";

import {userDto} from "./utils";
import {IUser} from "./interface";
import {TPaginationData, TUserCreateOne, TUserMany, TUserUpdateOne} from "./types";
import {AppDataSource} from "../../database/data-source";
import {User} from "../../database/entity/User.entity";
import {logger} from "../../common/logger/winston";

class UserService {
    private userRepository: Repository<User> = AppDataSource.getRepository(User);

    async createOne(payload: TUserCreateOne): Promise<IUser> {

        const userInstance = this.userRepository.create(payload);

        const newUser = await this.userRepository.save(userInstance);

        return userDto(newUser);

    }

    async updateOne(payload: TUserUpdateOne): Promise<User> {
        const {id} = payload;

        await this.userRepository.update(id, payload);

        const user = await this.userRepository.findOne({
            where: {id}
        });

        if (!user) {
            logger.error('User not found');
            throw new Error('User not found');
        }

        return userDto(user);
    }

    async getMany(paginationData: TPaginationData): Promise<TUserMany> {

        const {page, take} = paginationData;

        const res = await this.userRepository.find()
        const [users, total] = await this.userRepository.findAndCount({
            skip: (page - 1) * take,
            take
        });

        return {
            users: users.map(userDto),
            total,
            page,
            take
        }

    }
}

const userService = new UserService();
export default userService;