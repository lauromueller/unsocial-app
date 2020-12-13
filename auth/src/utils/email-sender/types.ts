export type EmailApiSendEmailArgs = {
  toEmail: string;
};

export type EmailApiSendEmailResponse = {
  toEmail: string;
  status: 'success' | 'error';
};

export interface IEmailSender {
  sendSignUpVerificationEmail: (
    args: EmailApiSendEmailArgs
  ) => Promise<EmailApiSendEmailResponse>;
}

export abstract class EmailSenderEmailApi implements IEmailSender {
  abstract sendSignUpVerificationEmail(
    args: EmailApiSendEmailArgs
  ): Promise<EmailApiSendEmailResponse>;

  protected abstract sendEmail(): void;
}
