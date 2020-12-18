import mongoose from 'mongoose';
import User from './user';
import { generateEmailVerificationToken } from '../utils/account-verification';

export type AccountVerificationDocument = mongoose.Document & {
  userId: mongoose.Types.ObjectId;
  emailVerificationToken: string;
};

export type AccountVerificationModel = mongoose.Model<AccountVerificationDocument>;

const accountVerificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  emailVerificationToken: {
    type: String,
    required: true,
    validate: (value: string): boolean => {
      if (!value || value.length !== 64) {
        throw new Error('Invalid email verification token');
      }

      return true;
    },
  },
});

accountVerificationSchema.pre(
  'save',
  async function verifyUserExists(this: AccountVerificationDocument) {
    const user = await User.findById(this.userId);

    if (!user) {
      throw new Error('User could not be found');
    }
  }
);

accountVerificationSchema.pre(
  'save',
  async function enforceTokenUniqueness(this: AccountVerificationDocument) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    let existingAccountVerificationDocument = await AccountVerification.findOne(
      {
        emailVerificationToken: this.emailVerificationToken,
      }
    );

    while (existingAccountVerificationDocument) {
      this.emailVerificationToken = generateEmailVerificationToken();

      // eslint-disable-next-line @typescript-eslint/no-use-before-define, no-await-in-loop
      existingAccountVerificationDocument = await AccountVerification.findOne({
        emailVerificationToken: this.emailVerificationToken,
      });
    }
  }
);

const AccountVerification = mongoose.model<
  AccountVerificationDocument,
  AccountVerificationModel
>('AccountVerification', accountVerificationSchema);

export default AccountVerification;
