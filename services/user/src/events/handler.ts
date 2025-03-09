import amqplib from "amqplib";
import config from '../config/configSetup'
import { randomUUID } from "crypto";

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


export async function PublishMessage(
    queueName: string,
    msg: any,
    reply: { replyTo: string; correlationId: string } | null,
    replyHandler: ((msg: any) => void) | null
) {
    const channel = await CreateChannel(queueName);

    const replyQueue = reply?.replyTo || `reply_queue_${randomUUID()}`;

    await channel.assertQueue(replyQueue, { durable: false, autoDelete: false });

    const options = reply ? reply : undefined;

    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(msg)), options);

    console.log('hasReply', reply);


    // Set up a single consumer per reply queue
    if (replyHandler && reply) {
        channel.consume(replyQueue, (msg) => {
            try {
                if (msg) {
                    replyHandler(JSON.parse(msg.content.toString()));
                }
            } catch (error) {
                console.error("Error processing message:", error);
            }
        }, { noAck: true });
    }

    console.log(`[x] Sent: ${msg}`);
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
