import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import {
  EmailApiSendEmailArgs,
  EmailApiSendEmailResponse,
  EmailApi,
} from './types';
import NodemailerSmtpServer from './nodemailer-smtp-server';

export default class NodemailerEmailApi implements EmailApi {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport(
      new NodemailerSmtpServer().getConfig()
    );
  }

  async sendSignUpVerificationEmail(
    args: EmailApiSendEmailArgs
  ): Promise<EmailApiSendEmailResponse> {
    const { toEmail } = args;

    await this.sendEmail({
      toEmail,
    });

    return {
      toEmail: 'test@test.com',
      status: 'success',
    };
  }

  private async sendEmail(args: EmailApiSendEmailArgs): Promise<void> {
    const { toEmail } = args;
    await this.transporter.sendMail({
      from: 'noreply@unsocial.app',
      to: toEmail,
      subject: 'My first email',
      text: 'This is our first test email',
    });
  }
}
