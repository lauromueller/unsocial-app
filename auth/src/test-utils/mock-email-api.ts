import {
  EmailApiSendEmailArgs,
  EmailApiSendEmailResponse,
  EmailSenderEmailApi,
} from '../utils/email-sender/types';

export const mockSendSignUpVerificationEmail = jest.fn(
  (toEmail: string): Promise<EmailApiSendEmailResponse> =>
    new Promise((resolve) => resolve({ toEmail, status: 'success' }))
);
export const mockSendEmail = jest.fn();

export class MockEmailApi extends EmailSenderEmailApi {
  sendSignUpVerificationEmail({
    toEmail,
  }: EmailApiSendEmailArgs): Promise<EmailApiSendEmailResponse> {
    this.sendEmail();
    return mockSendSignUpVerificationEmail(toEmail);
  }

  protected sendEmail(): void {
    mockSendEmail();
  }
}
