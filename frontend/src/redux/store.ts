import { configureStore } from '@reduxjs/toolkit';
import userAuthReducer from './slices/userAuthSlice';
 import chatRoomReducer from './slices/chatRoomSlice'
 export const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
     chatRoom:chatRoomReducer,
   },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
