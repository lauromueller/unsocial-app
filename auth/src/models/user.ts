import mongoose from 'mongoose';

// Interfaces vs. Types

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

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export default User;
