import mongoose from 'mongoose';

export type UserDocument = mongoose.Document & {
  email: string;
  password: string;
};

export interface UserModel extends mongoose.Model<UserDocument> {}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre(
  'save',
  async function preSaveFunction(this: UserDocument, next) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const existingUser = await User.findOne({ email: this.email });

    if (existingUser) {
      throw new Error('email is already in the database');
    }

    next();
  }
);

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export default User;
