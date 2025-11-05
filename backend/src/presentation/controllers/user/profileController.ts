import { Request, Response, NextFunction } from 'express';
import { getUserIdFromRequest } from '@shared/utils/getUserIdFromRequest';
import { IUser } from '@domain/entities/IUser';
import { uploadCloudinary } from '@infrastructure/services/cloudinary/cloudinaryService';
import { HttpStatus } from 'constants/HttpStatus/HttpStatus';
import { mapToPublicProfileDTO } from '@application/dtos/PublicProfileDTO ';
import { IProfileUseCases } from '@application/useCaseInterfaces/user/IProfileUseCases';

export class ProfileController {
  constructor(private _profileUseCases: IProfileUseCases) {}

  getUserProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = getUserIdFromRequest(req);
      const userProfile = await this._profileUseCases.getUserProfile(userId);

      res.status(HttpStatus.OK).json({
        userProfile,
        message: 'user profile fetched successfully',
      });
    } catch (error) {
      next(error);
    }
  };


  updateProfileImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = getUserIdFromRequest(req);
      const imagePath = req.file?.path;
      if (!imagePath) {
        res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: 'No file uploaded',
        });
        return;
      }

      const { url, public_id } = await uploadCloudinary(imagePath, 'profileImage');

      const profileImage = { url, public_id };

      const updatedUser = await this._profileUseCases.updateProfileImage(userId, profileImage);

      res.status(HttpStatus.CREATED).json({
        success: true,
        profileImage: updatedUser?.profileImage,
        message: 'Profile image uploaded successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  
 

}
