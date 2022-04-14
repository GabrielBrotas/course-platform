import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}

  @MessagePattern()
  sendEmail(@Ctx() context: RmqContext) {
    const message = context.getMessage().content.toString()
    return this.appService.sendEmail(JSON.parse(message))
  }
}
 