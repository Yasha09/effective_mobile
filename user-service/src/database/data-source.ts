import "reflect-metadata";
import {DataSource} from "typeorm";

import * as dotenv from "dotenv";

import {User} from "./entity/User.entity";

dotenv.config();

const {DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE, } =
    process.env;

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: parseInt(DB_PORT || "5432"),
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    synchronize: false,
    entities: [User],
    migrations: ["dist/database/migrations/*{.ts,.js}"],
    subscribers: [],
});

