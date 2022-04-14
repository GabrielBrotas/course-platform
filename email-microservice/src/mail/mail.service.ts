import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendEnrollCourseMessageDto, SendWelcomeToNewUserDto } from './dtos'

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendWelcomeToNewUser(data: SendWelcomeToNewUserDto) {
    await this.mailerService.sendMail({
      to: data.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Course Platform!',
      template: 'welcome', // `.hbs` extension is appended automatically
      context: { 
        name: data.name,
      },
    });
  }
  
  async sendEnrollCourseMessage(data: SendEnrollCourseMessageDto) {
    await this.mailerService.sendMail({
      to: data.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: 'enroll-course', // `.hbs` extension is appended automatically
      context: { 
        name: data.name,
        course_name: data.course_name,
      },
    });
  }
}
