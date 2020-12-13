import {
  EmailApiSendEmailArgs,
  EmailApiSendEmailResponse,
  IEmailSender,
  EmailSenderEmailApi,
} from './types';

export default class EmailSender implements IEmailSender {
  private isActive = false;

  private emailApi: EmailSenderEmailApi | undefined;

  private static emailSenderInstance: EmailSender;

  private constructor() {
    // no-op
  }

  static getInstance(): EmailSender {
    if (!this.emailSenderInstance) {
      this.emailSenderInstance = new EmailSender();
    }

    return this.emailSenderInstance;
  }

  static resetEmailSenderInstance(): void {
    this.emailSenderInstance = new EmailSender();
  }

  activate(): void {
    this.isActive = true;
  }

  deactivate(): void {
    this.isActive = false;
  }

  setEmailApi(emailApi: EmailSenderEmailApi): void {
    this.emailApi = emailApi;
  }

  async sendSignUpVerificationEmail(
    args: EmailApiSendEmailArgs
  ): Promise<EmailApiSendEmailResponse> {
    this.validateEmailSender();

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.emailApi!.sendSignUpVerificationEmail(args);
  }

  private validateEmailSender(): void {
    if (!this.isActive) {
      throw new Error('EmailSender is not active');
    }

    if (!this.emailApi) {
      throw new Error('EmailApi is not set');
    }
  }
}
