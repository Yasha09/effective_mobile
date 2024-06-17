require("reflect-metadata");
const {DataSource} = require("typeorm");

const UserActions = require("./entity/UserActionHistory.entity");

// dotenv.config();

const {DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE, NODE_ENV} = process.env;


// console.log("DB_HOST", DB_HOST)
const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "postgres",
    entities: [UserActions],
    database: "user_action_history",
    migrations: ["src/migrations/**/*.js"],
    synchronize: false,
});

module.exports = AppDataSource
