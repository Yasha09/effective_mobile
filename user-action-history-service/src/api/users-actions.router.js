const {Router} = require('express');

import userActionsController from './user-actions.controller';


const {userActionGetAllValidator} = require('./validation');

const userActionsRouter = Router();

userActionsRouter
    .get('/:userId', userActionGetAllValidator.getAll, userActionsController.getAll)
    .get('/', userActionGetAllValidator.getOne, userActionsController.getOne);