import { IRole, IUser } from '@domain/entities/IUser';
import { UserModel } from '@infrastructure/models/User';
import { IUserRepository } from '@domain/repositories/IUserRepository';
import { AppError } from '@shared/utils/AppError';
import { IPaginatedResult } from '@domain/entities/IPaginatedResult';
import { HttpStatus } from '@constants/HttpStatus/HttpStatus';

export class UserRepository implements IUserRepository {

  async getAllAdmins(): Promise<IUser[]> {
    return await UserModel.find({ role: 'admin', isBlocked: false });
  }


  async findByEmail(email: string): Promise<IUser | null> {
    const user = await UserModel.findOne({ email: email });
    return user ? user.toObject() : null;
  }

  async findByUsername(username: string): Promise<IUser | null> {
    const user = await UserModel.findOne({ username: username });
    return user ? user.toObject() : null;
  }

  async createUser(user: IUser): Promise<IUser> {
    const newUser = new UserModel(user);
    const saved = await newUser.save();
    return saved.toObject();
  }

  async updateUserPassword(email: string, password: string): Promise<IUser | null> {
    const updatedUser = await UserModel.findOneAndUpdate(
      { email: email },
      { $set: { password: password } },
      { new: true }
    );
    console.log(UserModel, updatedUser, 'updated');
    return updatedUser;
  }

  async findById(id: string): Promise<IUser | null> {
    const user = await UserModel.findById(id);
    return user ? user.toObject() : null;
  }


  async countAll(): Promise<number> {
    return UserModel.countDocuments();
  }


  async updateUserEmail(id: string, email: string): Promise<IUser | null> {
    const checkEmail = await UserModel.findOne({ email: email });
    if (checkEmail) {
      throw new AppError(400, 'Email Already taken');
    }
    const newEmail = await UserModel.findByIdAndUpdate(id, { email: email }, { new: true });
    return newEmail;
  }

  async changePassword(id: string, newPassword: string): Promise<IUser | null> {
    return await UserModel.findByIdAndUpdate(id, { password: newPassword });
  }

  async getUserProfile(id: string): Promise<IUser | null> {
    const userProfile = await UserModel.findById(id).select('-password').lean();
    return userProfile || null;
  }

  async updateProfileImage(
    id: string,
    profileImage: { url: string; public_id: string }
  ): Promise<IUser | null> {
    const user = await UserModel.findByIdAndUpdate(id, { profileImage }, { new: true }).lean();

    if (!user) {
      throw new AppError(404, 'User not found');
    }

    return user;
  }


  async updateUserProfile(id: string, profileData: Partial<IUser>): Promise<IUser | null> {
    const checkUsername = await UserModel.findOne({
      _id: { $ne: id },
      username: new RegExp(`^${profileData.username}$`, 'i'),
    });

    if (checkUsername) {
      throw new AppError(HttpStatus.BAD_REQUEST, 'Username is taken please try new one');
    }

    const updated = await UserModel.findByIdAndUpdate(id, profileData, {
      new: true,
    })
      .select('username email profileImage bio fullName gender dob phone')
      .lean();

    if (!updated) {
      throw new AppError(HttpStatus.NOT_FOUND, 'User not found');
    }

    return updated;
  }
  async searchAllUsers(search: string): Promise<IUser[]> {
    const searchRegex = { $regex: search, $options: 'i' };

    const query: any = { isBlocked: false };

    if (search && search.trim() !== '') {
      query.$or = [{ username: searchRegex }, { fullName: searchRegex }, { email: searchRegex }];
    }

    return UserModel.find(query)
      .select('_id username fullName profileImage email role')
      .sort({ createdAt: -1 })
      .limit(20);
  }



}
