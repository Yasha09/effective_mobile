import express from "express";
import * as dotenv from "dotenv";
import cors from 'cors';

import {logger} from "./common/logger/winston";
import userRouter from "./apis/users/user.router";
import {AppDataSource} from "./database/data-source";
import config from "./config";

dotenv.config();

const app = express();

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/users', userRouter)


AppDataSource.initialize()
    .then(async () => {
        app.listen(config.PORT, () => {
            logger.info("Server started... 3000");
        });
        logger.info("Database connected...");
    })
    .catch((error) => {
        logger.error("Database connection failed", error);
    })
