import mongoose, { UpdateQuery } from 'mongoose';
import { DuplicatedEmail } from '../errors';
import { PasswordHash } from '../utils';

export type UserDocument = mongoose.Document & {
  email: string;
  password: string;
  isVerified?: boolean;
};

export type UserModel = mongoose.Model<UserDocument>;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

async function validateUniqueness(userDoc: UserDocument) {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const existingUser = await User.findOne({ email: userDoc.email });

  if (existingUser) {
    throw new DuplicatedEmail();
  }
}

userSchema.pre(
  'save',
  async function preValidateUniqueness(this: UserDocument) {
    await validateUniqueness(this);
  }
);

userSchema.pre(
  /^.*([Uu]pdate).*$/,
  async function preValidateUniqueness(this: UpdateQuery<UserDocument>) {
    await validateUniqueness(this._update);
  }
);

userSchema.pre(
  'save',
  async function setIsVerifiedToFalseOnFirstSave(this: UserDocument) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const existingUser = await User.findOne({ email: this.email });

    if (!existingUser) {
      this.set('isVerified', false);
    }
  }
);

userSchema.pre('save', async function hashPassword(this: UserDocument) {
  if (this.isModified('password')) {
    const hashedPassword = PasswordHash.toHashSync({
      password: this.get('password'),
    });
    this.set('password', hashedPassword);
  }
});

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export default User;
