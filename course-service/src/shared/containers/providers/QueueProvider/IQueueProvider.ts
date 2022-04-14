type IQueueTypes = 'email-svc'

export type ISendMessageDTO = {
  queue_name: IQueueTypes;
  message: string;
}

export interface IQueueProvider {
  sendMessage(data: ISendMessageDTO): Promise<void>;
}