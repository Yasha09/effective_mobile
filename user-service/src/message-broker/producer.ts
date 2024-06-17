import amqp, {Channel} from "amqplib";
import config from "../config";
import {logger} from "../common/logger/winston";


class Producer {
    channel: Channel;

    async createChannel() {
        const connection = await amqp.connect(config.RABBITMQ_URL);
        this.channel = await connection.createChannel();
    }

    async publishMessage(routingKey: string, message: string) {

        if (!this.channel) {
            await this.createChannel();
        }

        const exchangeName = config.RABBITMQ_EXCHANGE_NAME;

        await this.channel.assertExchange(exchangeName, "direct");

        const logDetails = {
            logType: routingKey,
            message: message,
            dateTime: new Date(),
        };

        this.channel.publish(
            exchangeName,
            routingKey,
            Buffer.from(JSON.stringify(logDetails))
        );

        logger.info(`Message published to ${exchangeName} with routing key ${routingKey}`)
    }
}

const producer = new Producer();
export default producer;