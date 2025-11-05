import { Router } from 'express';
import { upload } from '@presentation/middlewares/upload';
import { chatUpload } from '@presentation/middlewares/chatUpload';
import { userAuthMiddleware } from '@presentation/middlewares/userAuthMiddleware';
 import {
  AUTH_ROUTES,
   PROFILE_ROUTES,
  USER_ROUTES,
 
  CHAT_ROOM_ROUTE,
  MESSAGE_ROUTE,
   
 } from 'constants/route-constants/userRoutes';

import { UserAuthUsecases } from '@application/usecases/user/userAuthUseCases';
import { UserRepository } from '@infrastructure/repositories/UserRepository';
import { OtpRepository } from '@infrastructure/repositories/OtpRepository';
import { userRefreshToken } from '@presentation/controllers/token/userRefreshToken';
 import { UserAuthController } from '@presentation/controllers/user/UserAuthController';

import { ProfileUseCases } from '@application/usecases/user/profileUseCases';
import { ProfileController } from '@presentation/controllers/user/profileController';

import { ChatRoomRepository } from '@infrastructure/repositories/ChatRoomRepository';
import { ChatRoomUseCase } from '@application/usecases/chat/chatRoomUseCases';
import { ChatRoomController } from '@presentation/controllers/chat/ChatRoomController';

import { MessageRepository } from '@infrastructure/repositories/MessageRepository';
import { MessageUseCases } from '@application/usecases/chat/messageUseCases';
import { MessageController } from '@presentation/controllers/chat/MessageController';

 
const chatRoomRepository = new ChatRoomRepository();
const chatRoomUseCase = new ChatRoomUseCase(chatRoomRepository);
const chatRoomController = new ChatRoomController(chatRoomUseCase);

const messageRepository=new MessageRepository()
const messageUseCases=new MessageUseCases(messageRepository,chatRoomRepository)
const messageController=new MessageController(messageUseCases)


const userRepository = new UserRepository();
const otpRepository = new OtpRepository();
const userAuthUseCases = new UserAuthUsecases(
  userRepository,
  otpRepository,
);
const userAuthController = new UserAuthController(userAuthUseCases);

 
const profileRepository = new UserRepository();
const profileUseCases = new ProfileUseCases(profileRepository);
const profileController = new ProfileController(profileUseCases);

 
const router = Router();

// AUTH ROUTES
router.post(AUTH_ROUTES.REFRESH_TOKEN, userRefreshToken);
router.post(AUTH_ROUTES.PRE_REGISTER, userAuthController.preRegister);
router.post(AUTH_ROUTES.REGISTER, userAuthController.register);
router.post(AUTH_ROUTES.RESEND_OTP, userAuthController.resendOtp);
router.post(AUTH_ROUTES.LOGIN, userAuthController.login);
router.post(AUTH_ROUTES.GOOGLE_LOGIN, userAuthController.googleLogin);
router.post(AUTH_ROUTES.FORGOT_PASSWORD, userAuthController.forgotPassword);
router.post(AUTH_ROUTES.VERIFY_OTP, userAuthController.verifyOtpForForgotPassword);
router.post(AUTH_ROUTES.FORGOT_PASSWORD_CHANGE, userAuthController.forgotPasswordChange);
router.post(AUTH_ROUTES.LOGOUT, userAuthController.userLogout);
router.post(
  AUTH_ROUTES.EMAIL_REQUEST_CHANGE,
  userAuthMiddleware,
  userAuthController.requestEmailChange
);
router.post(
  AUTH_ROUTES.EMAIL_VERIFY_CHANGE,
  userAuthMiddleware,
  userAuthController.verifyAndUpdateEmail
);
router.post(AUTH_ROUTES.PASSWORD_CHANGE, userAuthMiddleware, userAuthController.changePassword);


router.get(USER_ROUTES.SEARCH_USERS_FOR_CHAT,userAuthMiddleware,userAuthController.searchUsersForChat)

// PROFILE ROUTES
router.get(PROFILE_ROUTES.GET_PROFILE, userAuthMiddleware, profileController.getUserProfile);
 router.put(
  PROFILE_ROUTES.UPLOAD_PROFILE_IMAGE,
  userAuthMiddleware,
  upload.single('image'),
  profileController.updateProfileImage
);

 router.post(CHAT_ROOM_ROUTE.CREATE, userAuthMiddleware, chatRoomController.createRoom);
router.put(CHAT_ROOM_ROUTE.UPDATE, userAuthMiddleware, chatRoomController.updateRoom);
router.get(CHAT_ROOM_ROUTE.GET_BY_ID, userAuthMiddleware, chatRoomController.getRoomById);
router.get(CHAT_ROOM_ROUTE.GET_USER_ROOMS, userAuthMiddleware, chatRoomController.getUserRooms);
router.delete(CHAT_ROOM_ROUTE.DELETE, userAuthMiddleware,chatRoomController.deleteRoom);

//MESSAGE ROUTES
 //router.post(MESSAGE_ROUTE.SEND, userAuthMiddleware, messageController.sendMessage);
 router.get(MESSAGE_ROUTE.GET_BY_ROOM, userAuthMiddleware, messageController.getMessages);
//router.patch(MESSAGE_ROUTE.MARK_AS_READ, userAuthMiddleware, messageController.markMessageRead);
// router.delete(MESSAGE_ROUTE.DELETE, userAuthMiddleware,messageController.deleteMessage);
 router.post(MESSAGE_ROUTE.UPLOAD_MEDIA, userAuthMiddleware,chatUpload.single('file'), messageController.uploadMediaToChat);




export default router;
