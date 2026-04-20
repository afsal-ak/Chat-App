import { HttpStatus } from '@constants/HttpStatus/HttpStatus';
import { IUser } from '@domain/entities/IUser';
 import { AppError } from '@shared/utils/AppError';
import { IProfileUseCases } from '@application/useCaseInterfaces/user/IProfileUseCases';
import { IUserRepository } from '@domain/repositories/IUserRepository';
import { ProfileDTO, UpdateProfileDTO } from '@application/dtos/PublicProfileDTO ';


export class ProfileUseCases implements IProfileUseCases {

  constructor(
    private _userRepo: IUserRepository,
   ) { }

  async getUserProfile(userId: string): Promise<IUser | null> {
    return await this._userRepo.getUserProfile(userId);
  }

  async updateProfileImage(
    userId: string,
    profileImage: { url: string; public_id: string }
  ): Promise<IUser | null> {
    return await this._userRepo.updateProfileImage(userId, profileImage);
  }

  async updateUserProfile(
    userId: string,
    profileData: UpdateProfileDTO
  ): Promise<IUser | null> {
    const profile = await this._userRepo.updateUserProfile(userId, profileData);
    return profile?profile:null 
  }

}
