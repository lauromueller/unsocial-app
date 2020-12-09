import {
  EmailApiSendEmailArgs,
  EmailApiSendEmailResponse,
  IEmailSenderEmailApi,
} from '../utils/email-sender';

export const mockSendSignUpVerificationEmail = jest.fn(
  (toEmail: string): Promise<EmailApiSendEmailResponse> =>
    new Promise((resolve) => resolve({ toEmail, status: 'success' }))
);
export const mockSendEmail = jest.fn();

export class MockEmailApi implements IEmailSenderEmailApi {
  sendSignUpVerificationEmail({
    toEmail,
  }: EmailApiSendEmailArgs): Promise<EmailApiSendEmailResponse> {
    this.sendEmail();
    return mockSendSignUpVerificationEmail(toEmail);
  }

  sendEmail() {
    mockSendEmail();
  }
}
