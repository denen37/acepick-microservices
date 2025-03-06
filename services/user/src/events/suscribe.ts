import amqplib from "amqplib";
import config from '../config/configSetup'

const RABBITMQ_URL = config.RABBITMQ_URL || "amqp://localhost:5672";
let amqplibConnection: any = null;

export async function CreateChannel(queue: string) {
    try {
        const connection = await amqplib.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(queue, { durable: false });

        console.log(`✅ Connected to RabbitMQ - Queue: ${queue}`);
        return channel;
    } catch (error) {
        console.error("❌ Failed to connect to RabbitMQ:", error);
        process.exit(1);
    }
}


export async function ConsumeMessage(queueName: string, action: (msg: any) => any, reply: boolean = false) {
    const channel = await CreateChannel(queueName);

    console.log(`🔗 User Service listening for ${queueName}...`);

    channel.consume(queueName, async (msg) => {
        if (msg) {
            const data = JSON.parse(msg.content.toString());

            const result = action(data);

            if (reply) {
                const replyQueue = msg.properties.replyTo;
                channel.sendToQueue(replyQueue, Buffer.from(result), {
                    correlationId: msg.properties.correlationId
                });
            }
        }
    }, { noAck: true });
}









