import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { EmailSender } from '../utils';

let mongoMemoryServer: MongoMemoryServer;
mongoose.set('useFindAndModify', false);

beforeAll(async () => {
  mongoMemoryServer = new MongoMemoryServer();
  const mongoUri = await mongoMemoryServer.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const allCollections = await mongoose.connection.db.collections();

  allCollections.forEach(async (collection) => {
    await collection.deleteMany({});
  });

  EmailSender.resetEmailSenderInstance();
  jest.clearAllMocks();
});

afterAll(async () => {
  await mongoMemoryServer.stop();
  await mongoose.connection.close();
});
