import {
  EmailApi,
  EmailApiSendEmailResponse,
  EmailApiSendSignUpVerificationEmailArgs,
} from '../utils/email-sender/types';

export const mockSendSignUpVerificationEmail = jest.fn(
  (toEmail: string): Promise<EmailApiSendEmailResponse> =>
    new Promise((resolve) => resolve({ toEmail, status: 'success' }))
);

export class MockEmailApi implements EmailApi {
  sendSignUpVerificationEmail({
    toEmail,
  }: EmailApiSendSignUpVerificationEmailArgs): Promise<EmailApiSendEmailResponse> {
    return mockSendSignUpVerificationEmail(toEmail);
  }
}
