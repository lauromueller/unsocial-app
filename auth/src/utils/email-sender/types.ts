export type EmailApiSendEmailArgs = {
  toEmail: string;
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
    args: EmailApiSendEmailArgs
  ): Promise<EmailApiSendEmailResponse>;
}

export interface SmtpServer {
  getConfig(): SmtpServerConfig;
}
