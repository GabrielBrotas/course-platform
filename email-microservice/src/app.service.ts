import { Injectable } from '@nestjs/common';
import { MailService } from './mail/mail.service';

type IMessage = {
  type: string;
  [key: string]: any
}
@Injectable()
export class AppService {
  constructor(
    private readonly mailService: MailService,
  ) {}

  async sendEmail(message: IMessage): Promise<void> {
    console.log(message)
    if(message.type == "new-user") {
      await this.mailService.sendWelcomeToNewUser({
        email: message.email,
        name: message.name,
      })
      console.log(`Welcome email sent to ${message.email}`)
    }

    if(message.type == 'enroll-course') {
      await this.mailService.sendEnrollCourseMessage({
        email: message.email,
        name: message.name,
        course_name: message.course_name,
      })
      console.log(`Course email sent to ${message.email}`)

    }
  }
}
