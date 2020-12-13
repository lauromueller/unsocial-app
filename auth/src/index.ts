import dotenv from 'dotenv-safe';
import app from './app';
import { EmailSender, NodemailerEmailApi } from './utils/email-sender';

dotenv.config({
  path: '.env.dev',
});

const emailSender = EmailSender.getInstance();
emailSender.activate();
emailSender.setEmailApi(new NodemailerEmailApi());

app.listen(3000, async () => {
  console.log('Listening on port 3000.');
});
