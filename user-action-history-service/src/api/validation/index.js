import Joi from 'joi';

const userActionGetAllSchema = Joi.object({
    userId: Joi.string().uuid({version: 'uuidv4'}).optional().label('User Id'),
    page: Joi.number().optional().default(1).min(1).label('Page'),
    limit: Joi.number().optional().default(10).min(1).label('Limit'),
    order: Joi.string().valid('ASC', 'DESC').optional().label('Order'),
    firstName: Joi.string().optional().label('First Name'),
    email: Joi.string().email().optional().label('Email'),
    sort: Joi.string().optional().label('Sort'),
});

const userActionGetOneSchema = Joi.object({
    id: Joi.string().uuid({version: 'uuidv4'}).required().label('User Id'),
});



const userActionGetAllValidator = {
    getAll(req, res, next) {

        const {error, value} = userActionGetAllSchema.validate(req.body);

        if (error) {
            return res.status(400).json({message: error.details[0].message});
        }

        next();
    },

    getOne(req, res, next) {
        const {error, value} = userActionGetOneSchema.validate(req.params);

        if (error) {
            return res.status(400).json({message: error.details[0].message});
        }

        next();
    }

}

module.exports = {
    userActionGetAllValidator
}