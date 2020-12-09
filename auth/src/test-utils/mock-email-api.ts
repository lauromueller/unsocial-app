import {
  EmailApiSendEmailArgs,
  EmailApiSendEmailResponse,
  EmailSenderEmailApi,
} from '../utils/email-sender';

export class MockEmailApi implements EmailSenderEmailApi {
  sendEmail({
    toEmail,
  }: EmailApiSendEmailArgs): Promise<EmailApiSendEmailResponse> {
    return new Promise((resolve) => resolve({ toEmail, status: 'success' }));
  }
}
