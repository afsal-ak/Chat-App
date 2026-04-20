export const AUTH_ROUTES = {
  REFRESH_TOKEN: '/refresh-token',
  PRE_REGISTER: '/pre-register',
  REGISTER: '/register',
  RESEND_OTP: '/resend-otp',
  LOGIN: '/login',
  GOOGLE_LOGIN: '/google-login',
  FORGOT_PASSWORD: '/forgotPassword',
  VERIFY_OTP: '/verify-otp',
  FORGOT_PASSWORD_CHANGE: '/forgotPasswordChange',
  LOGOUT: '/logout',
  EMAIL_REQUEST_CHANGE: '/email/request-change',
  EMAIL_VERIFY_CHANGE: '/email/verify-change',
  PASSWORD_CHANGE: '/password/change',
};

 
//router.get('/packages/:id', homeController.getPackagesById);

export const PROFILE_ROUTES = {
  GET_PROFILE: '/profile',
  UPDATE_PROFILE: '/profile/update',
  UPLOAD_PROFILE_IMAGE: '/profile/uploadProfileImage',
  CREATE_COVER_IMAGE: '/profile/uploadCoverImage',
    
};
export const USER_ROUTES = {
  SEARCH_USERS_FOR_CHAT: '/users/search'
};
 

export const CHAT_ROOM_ROUTE = {
  CREATE: "/chatrooms",
  UPDATE: "/chatrooms/:roomId",
  GET_BY_ID: "/chatrooms/:roomId",
  GET_USER_ROOMS: "/chatrooms",
  DELETE: "/chatrooms/:roomId",
};


export const MESSAGE_ROUTE = {
  SEND: "/chatrooms/messages",
  GET_BY_ROOM: "/chatrooms/:roomId/messages",
  MARK_AS_READ: "/messages/:messageId/read",
  DELETE: "/messages/:messageId",
  UPLOAD_MEDIA: '/messages/upload'

};
 