import { IRole, IUser } from '@domain/entities/IUser';
import { UserModel } from '@infrastructure/models/User';
import { IUserRepository } from '@domain/repositories/IUserRepository';
import { AppError } from '@shared/utils/AppError';
 import { IPaginatedResult } from '@domain/entities/IPaginatedResult';

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


  async searchUsersForChat(userId: string, search: string, role: IRole): Promise<IUser[]> {

    const searchRegex = { $regex: search, $options: "i" };

    // If admin → search all non-blocked users
    if (role === "admin") {
      const query: any = { isBlocked: false };

      // Apply regex only if search exists
      if (searchRegex) {
        query.$or = [
          { username: searchRegex },
          { fullName: searchRegex },
        ];
      }

      return UserModel.find(query)
        .select("_id username fullName profileImage role");
    }

    // For normal users → fetch only followed users + admins
    const currentUser = await UserModel.findById(userId).select("following");

    const query: any = {
      isBlocked: false,
      $or: [],
    };

    // If following users exist, add them to search
    if (currentUser?.following?.length) {
      const followingBlock: any = {
        _id: { $in: currentUser.following },
      };

      if (searchRegex) {
        followingBlock.$or = [
          { username: searchRegex },
          { fullName: searchRegex },
        ];
      }

      query.$or.push(followingBlock);
    }

    // Always allow chatting with admins
    const adminBlock: any = { role: "admin" };
    if (searchRegex) {
      adminBlock.$or = [
        { username: searchRegex },
        { fullName: searchRegex },
      ];
    }

    query.$or.push(adminBlock);

    return UserModel.find(query)
      .select("_id username fullName profileImage role");
  }



}
