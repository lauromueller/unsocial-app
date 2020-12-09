import { EmailSender } from '../index';
import {
  MockEmailApi,
  mockSendSignUpVerificationEmail,
} from '../../test-utils/mock-email-api';

it('should throw an error when sending an email if the EmailSender is deactivated', async () => {
  const emailSender = EmailSender.getInstance();
  emailSender.deactivate();
  await expect(
    emailSender.sendSignUpVerificationEmail({ toEmail: 'test@test.com' })
  ).rejects.toThrowError('EmailSender is not active');
});

it('should throw an error when sending an email if the EmailApi is not set', async () => {
  const emailSender = EmailSender.getInstance();
  emailSender.activate();
  await expect(
    emailSender.sendSignUpVerificationEmail({ toEmail: 'test@test.com' })
  ).rejects.toThrowError('EmailApi is not set');
});

it('should send the signup verification email if the sender is active and the EmailApi is set', async () => {
  const emailSender = EmailSender.getInstance();
  const mockEmailApi = new MockEmailApi();

  emailSender.activate();
  emailSender.setEmailApi(mockEmailApi);

  await emailSender.sendSignUpVerificationEmail({ toEmail: 'test@test.com' });
  expect(mockSendSignUpVerificationEmail).toHaveBeenCalledTimes(1);
});
