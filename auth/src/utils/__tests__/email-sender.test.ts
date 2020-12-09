import { EmailSender } from '../index';

it('should throw an error when sending an email if the EmailSender is deactivated', async () => {
  const emailSender = EmailSender.getInstance();
  emailSender.deactivate();
  await expect(
    emailSender.sendEmail({ toEmail: 'test@test.com' })
  ).rejects.toThrowError('EmailSender is not active');
});

it('should throw an error when sending an email if the EmailApi is not set', async () => {
  const emailSender = EmailSender.getInstance();
  emailSender.activate();
  await expect(
    emailSender.sendEmail({ toEmail: 'test@test.com' })
  ).rejects.toThrowError('EmailApi is not set');
});
