import {
  EmailApiSendEmailArgs,
  EmailApiSendEmailResponse,
  EmailApi,
} from '../utils/email-sender/types';

export const mockSendSignUpVerificationEmail = jest.fn(
  (toEmail: string): Promise<EmailApiSendEmailResponse> =>
    new Promise((resolve) => resolve({ toEmail, status: 'success' }))
);
export const mockSendEmail = jest.fn();

export class MockEmailApi implements EmailApi {
  sendSignUpVerificationEmail({
    toEmail,
  }: EmailApiSendEmailArgs): Promise<EmailApiSendEmailResponse> {
    this.sendEmail();
    return mockSendSignUpVerificationEmail(toEmail);
  }

  private sendEmail(): void {
    mockSendEmail();
  }
}
