import { IUser } from '@domain/entities/IUser';
export interface UpdateProfileDTO {
  fullName?: string;
  bio?: string;
  gender?: 'male' | 'female';
  dob?: Date;
  interests?: string[];
  links?: { platform: string; url: string }[];
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
}
export interface PublicProfileDTO {
  _id: string;
  username: string;
  fullName?: string;
  bio?: string;
  profileImage?: {
    url: string;
    public_id: string;
  };
  coverImage?: {
    url: string;
    public_id: string;
  };
   
}
export interface ProfileDTO {
  _id: string;
  username: string;
  email: string;
  fullName?: string;
  bio?: string;
  phone?: number;
  profileImage?: {
    url: string;
    public_id: string;
  };
  coverImage?: {
    url: string;
    public_id: string;
  };
   
   createdAt?: string;
  updatedAt?: string;
}
export const mapToPublicProfileDTO = (user: IUser): PublicProfileDTO => ({
  _id: user._id!.toString(),
  username: user.username!,
  fullName: user.fullName,
   profileImage: user.profileImage,
  });
