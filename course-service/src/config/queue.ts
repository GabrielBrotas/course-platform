import { Options } from 'amqplib';

interface IQueueConfig {
    url: string | Options.Connect,
    socketOptions?: any
}

const queueConfig: IQueueConfig = {
    url: process.env.RABBIT_MQ_URL || 'amqp://localhost',
};

export default queueConfig