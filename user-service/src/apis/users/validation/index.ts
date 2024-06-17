import {NextFunction, Request, Response} from 'express';
import Joi from "joi";

import {logger} from "../../../common/logger/winston";

const crateUserOneSchema = Joi.object({
    firstName: Joi.string().required().label('First Name'),
    lastName: Joi.string().required().label('Last Name'),
    email: Joi.string().email().required().label('Email'),
});

const updateUserOneSchema = Joi.object({
    id: Joi.string().uuid({version: 'uuidv4'}).required().label('User Id'),
    firstName: Joi.string().optional().label('First Name'),
    lastName: Joi.string().optional().label('Last Name'),
    email: Joi.string().email().optional().label('Email'),
});

const getUsersSchema = Joi.object({
    page: Joi.number().integer().min(1).optional().default(1).label('Page'),
    take: Joi.number().integer().min(1).optional().default(10).label('Take'),
});


const authValidator = {
    createUser(req: Request, res: Response, next: NextFunction) {

        const {error, value} = crateUserOneSchema.validate(req.body);

        if (error) {
            logger.error('User not created', error);
            return res.status(400).json({message: error.details[0].message});
        }
        next();
    },

    updateUser(req: Request, res: Response, next: NextFunction) {
        const {error, value} = updateUserOneSchema.validate(req.body);

        if (error) {
            logger.error('User not updated', error);
            return res.status(400).json({message: error.details[0].message});
        }

        next();
    },

    getUsers(req: Request, res: Response, next: NextFunction) {
        const {error, value} = getUsersSchema.validate(req.query);

        if (error) {
            logger.error('Users not fetched', error);
            return res.status(400).json({message: error.details[0].message});
        }

        next();
    }
}


export default authValidator;

