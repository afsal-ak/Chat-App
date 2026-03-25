import { Types } from 'mongoose';
export type IRole='user'|'admin'
export interface IUser {
  _id?: Types.ObjectId | string;
  username?: string;
  email: string;
  phone?: number;
  password?: string;
  role?: IRole
  isBlocked?: boolean;
  fullName?: string;
   gender?: 'male' | 'female';
  profileImage?: {
    url: string;
    public_id: string;
  };
   
  googleId?: string;
  isGoogleUser?: boolean;
}
