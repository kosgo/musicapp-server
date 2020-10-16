import { Document, model } from 'mongoose';
import UserSchema from './user.schema';

export interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface UserDocument extends User, Document {}

export const UserModel = model<UserDocument>('User', UserSchema);
