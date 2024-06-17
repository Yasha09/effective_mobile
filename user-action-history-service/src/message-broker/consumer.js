const amqp = require("amqplib");
const AppDataSource = require("../data-source");
const UserActions = require("../entity/UserActionHistory.entity");
const {Repository} = require("typeorm");

const EXCHANGE_NAME = 'user_action'

const BINDING_KEY = "USER_ACTION_INFO"


module.exports = async () => {
    const userActionRepo = AppDataSource.getRepository(UserActions);
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    await channel.assertExchange(EXCHANGE_NAME, "direct");

    const q = await channel.assertQueue("InfoQueue");

    await channel.bindQueue(q.queue, EXCHANGE_NAME, BINDING_KEY);

    await channel.consume(q.queue, async (msg) => {
        const payload = JSON.parse(msg.content.toString());

        const data = JSON.parse(payload.message)
        channel.ack(msg);

        if (data) {
            const userAction = await userActionRepo.save({
                userId: data.id,
                actionType: data.action,
                firstName: data.firstName,
                lastName: data.lastName,
                actionData: data
            })
        }
    });


}



