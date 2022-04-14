import Redis, { Redis as RedisClient } from 'ioredis';
import { inject, injectable } from 'inversify';
import rabbitmq from 'amqplib'

import { IQueueProvider, ISendMessageDTO } from './IQueueProvider';
import queueConfig from '@src/config/queue';
import { LoggerProvider } from '../LoggerProvider/LoggerProvider';

@injectable()
export class QueueProvider implements IQueueProvider {
  private client: Promise<rabbitmq.Connection>;

  constructor(
    @inject(LoggerProvider) private loggerProvider: LoggerProvider
  ) {
    this.client = rabbitmq.connect(queueConfig.url, queueConfig.socketOptions) as any;
  }

  public async sendMessage({queue_name, message}: ISendMessageDTO): Promise<void> {
    const channel = await this.client.then( conn => conn.createChannel() );
    
    channel.assertQueue(queue_name, { durable: false });

    channel.sendToQueue(queue_name, Buffer.from(message));

    this.loggerProvider.debug({
      type: 'debug',
      message: `Message sent to queue ${queue_name}`,
      payload: {
        message
      }
    })
  }

}
