import {Request, Response, NextFunction} from "express";

import userService from "./user.service";
import {IUser} from "./interface";
import {logger} from "../../common/logger/winston";
import producer from "../../message-broker/producer";
import {ROUTING_KEY, UserActionTypes} from "./types";
import { getPaginationData} from "./utils";

class UserController {
    async createOne(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const newUser: IUser= await userService.createOne(req.body);

            logger.info('User created successfully');

            await producer.publishMessage(ROUTING_KEY, JSON.stringify({
                ...newUser,
                action: UserActionTypes.created,
            }));

            res.status(200).json({
                message: "User created successfully",
                data: newUser
            })
        } catch (error) {
            logger.warn('User not created', error);
        }
    }

    async updateOne(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const updatedUser: IUser = await userService.updateOne(req.body);


            await producer.publishMessage(ROUTING_KEY, JSON.stringify({
                ...updatedUser,
                action: UserActionTypes.updated,
            }));

            logger.info('User updated successfully');


            res.status(200).json({
                message: "User updated successfully",
                data: updatedUser
            })
        } catch (error) {
            logger.warn('User not updated', error);
        }

    }

    async getMany(req: Request, res: Response, next: NextFunction): Promise<void> {
        const paginationData = getPaginationData(req.query);

        try {
            const users = await userService.getMany(paginationData);

            logger.info('Users fetched successfully');

            res.status(200).json({
                message: "Users fetched successfully",
                data: users
            })
        } catch (error) {
            logger.warn('Users not fetched', error);
        }

    }
}

const userController = new UserController();
export default userController;