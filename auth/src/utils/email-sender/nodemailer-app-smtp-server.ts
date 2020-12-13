import { SmtpServer, SmtpServerConfig } from './types';

export default class NodemailerAppSmtpServer implements SmtpServer {
  private host = 'localhost';

  private port = 1025;

  private user = 'project.1';

  private pass = 'secret.1';

  getConfig(): SmtpServerConfig {
    return {
      host: this.host,
      port: this.port,
      auth: {
        user: this.user,
        pass: this.pass,
      },
    };
  }
}
