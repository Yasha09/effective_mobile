import 'dotenv/config'

const PORT: number = Number(process.env.PORT) || 8080;
const DB_HOST: string = process.env.DB_HOST as string;
const DB_PORT: number = Number(process.env.DB_PORT) as number;
const DB_USER: string = process.env.DB_NAME as string;
const DB_PASSWORD: string = process.env.DB_PASSWORD as string;
const DB_DATABASE: string = process.env.DB_DATABASE as string;

const RABBITMQ_URL: string = process.env.RABBITMQ_URL as string;
const RABBITMQ_EXCHANGE_NAME: string = process.env.RABBITMQ_EXCHANGE_NAME as string;

export default {
    PORT,
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_DATABASE,
    RABBITMQ_URL,
    RABBITMQ_EXCHANGE_NAME
}