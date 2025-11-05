import { IUser,IRole } from '../entities/IUser';
 
import { IPaginatedResult } from '@domain/entities/IPaginatedResult';
export interface IUserRepository {
  findByEmail(email: string): Promise<IUser | null>;
  findByUsername(username: string): Promise<IUser | null>;
  createUser(user: Partial<IUser>): Promise<IUser>;
  updateUserPassword(email: string, password: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
   updateUserEmail(id: string, email: string): Promise<IUser | null>;
  changePassword(id: string, newPassword: string): Promise<IUser | null>;
   getUserProfile(id: string): Promise<IUser | null>;
 
  updateProfileImage(
    id: string,
    profileImage: { url: string; public_id: string }
  ): Promise<IUser | null>;
 
   searchUsersForChat(
    userId: string,
    search: string,
    role:IRole
  ): Promise<IUser[]>   

}
