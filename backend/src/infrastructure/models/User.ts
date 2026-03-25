import mongoose, { Schema, Document, Model } from 'mongoose';
import { IUser } from '@domain/entities/IUser';

export interface IUserDocument extends Omit<IUser, '_id'>, Document {
  _id: mongoose.Types.ObjectId;
}

const UserSchema = new Schema<IUserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: { type: Number },
    password: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
 
    isBlocked: {
      type: Boolean,
      default: false,
    },

    fullName: { type: String },
    gender: { type: String, enum: ['male', 'female'] },
    profileImage: {
      url: { type: String, required: false },
      public_id: { type: String, required: false },
    },
    googleId: String,
    isGoogleUser: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel: Model<IUserDocument> = mongoose.model<IUserDocument>('Users', UserSchema);
