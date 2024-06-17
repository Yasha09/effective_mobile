import {Router} from "express";
import authValidator from "./validation";
import userService from "./user.service";
import userController from "./user.controller";


const userRouter = Router();

userRouter
    .post('/', authValidator.createUser, userController.createOne)
    .patch('/', authValidator.updateUser, userController.updateOne)
    .get('/', authValidator.getUsers, userController.getMany)

export default userRouter;
