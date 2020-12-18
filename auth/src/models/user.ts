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

userSchema.pre('save', function preHashPassword(this: UserDocument) {
  const newPassword = this.isModified('password') ? this.get('password') : null;

  if (newPassword) {
    this.set(
      'password',
      PasswordHash.toHashSync({
        password: newPassword,
      })
    );
  }
});

userSchema.pre(
  /^.*([Uu]pdate).*$/,
  async function preHashPassword(this: UpdateQuery<UserDocument>) {
    const newPassword = this._update.password ? this._update.password : null;

    if (newPassword) {
      this._update.password = PasswordHash.toHashSync({
        password: newPassword,
      });
    }
  }
);

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export default User;
