import { Controller, Get } from '@nestjs/common';
// import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { MailService } from './mail/mail.service';

@Controller()
export class AppController {
  constructor(
    private readonly mailService: MailService,
  ) {}

  // @MessagePattern('email-svc')
  // sendEmail(@Payload() message) {
  //   console.log('Message Received', message);
  // }

  @Get('/')
  async sendEmail() {
    await this.mailService.sendWelcomeToNewUser({
      name: "Joao",
      email: "someemail@gmail.com"
    });
  }
}
