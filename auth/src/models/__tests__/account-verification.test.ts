import mongoose from 'mongoose';
import { generateAccountVerificationToken } from '../../utils/account-verification';
import { AccountVerification, User } from '../index';

describe('tests the AccountVerification mongoose model', () => {
  it('should not save a new AccountVerification document if no valid user is provided', async () => {
    const emailVerificationToken = generateAccountVerificationToken();

    await expect(
      AccountVerification.create({
        userId: new mongoose.Types.ObjectId(),
        emailVerificationToken,
      })
    ).rejects.toThrow('User could not be found');
  });

  it('should not save a new AccountVerification document if the token is invalid', async () => {
    const newUser = await User.create({
      email: 'test@test.com',
      password: 'Valid123',
    });

    await expect(
      AccountVerification.create({
        userId: newUser._id,
        emailVerificationToken: 'notvalid',
      })
    ).rejects.toThrow('Invalid email verification token');
  });
});
