export type EmailApiSendSignUpVerificationEmailArgs = {
  toEmail: string;
  emailVerificationToken: string;
};

export type EmailApiSendEmailArgs = {
  toEmail: string;
  subject: string;
  textBody: string;
  htmlBody: string;
};

export type EmailApiSendEmailResponse = {
  toEmail: string;
  status: 'success' | 'error';
};

export type SmtpServerConfigAuth = {
  user: string;
  pass: string;
};

export type SmtpServerConfig = {
  host: string;
  port: number;
  auth: SmtpServerConfigAuth;
};

export interface EmailApi {
  sendSignUpVerificationEmail(
    args: EmailApiSendSignUpVerificationEmailArgs
  ): Promise<EmailApiSendEmailResponse>;
}

export interface SmtpServer {
  getConfig(): SmtpServerConfig;
}
