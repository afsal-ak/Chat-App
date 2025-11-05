import { IUser } from '@domain/entities/IUser';

export interface IProfileUseCases {
  getUserProfile(userId: string): Promise<IUser | null>;

  updateProfileImage(
    userId: string,
    profileImage: { url: string; public_id: string }
  ): Promise<IUser | null>;
 
}
