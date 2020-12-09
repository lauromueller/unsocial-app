import {
  EmailApiSendEmailArgs,
  EmailApiSendEmailResponse,
  EmailSenderEmailApi,
} from '../utils/email-sender';

export const mockSendSignUpVerificationEmail = jest.fn();

export class MockEmailApi implements EmailSenderEmailApi {
  sendSignUpVerificationEmail(
    _args: EmailApiSendEmailArgs
  ): Promise<EmailApiSendEmailResponse> {
    return mockSendSignUpVerificationEmail();
  }
}
