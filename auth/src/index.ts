import dotenv from 'dotenv-safe';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from './app';
import { EmailSender, NodemailerEmailApi } from './utils/email-sender';

const parsedNodeEnv = process.env.NODE_ENV || 'development';

dotenv.config({
  path: parsedNodeEnv === 'development' ? '.env.dev' : '.env.production',
});

const mongoMemoryServer = new MongoMemoryServer();
const emailSender = EmailSender.getInstance();

emailSender.activate();
emailSender.setEmailApi(new NodemailerEmailApi());

app.listen(3000, async () => {
  const mongoUri = await mongoMemoryServer.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('Listening on port 3000.');
});
