import { Route } from 'react-router-dom';
import UserProtectedRoutes from './UserProtectedRoute';
import Home from '@/pages/user/home/Home';
 import Profile from '@/pages/user/profile/Profile';
import EmailOtpPage from '@/pages/user/profile/EmailOtpPage';

 import ChatLayout from '@/layouts/ChatLayout';
import UserSearchAndMessage from '@/components/chat/UserSearchForChat';
 // import UploadImage from '@/pages/user/chat/UploadImage';
import MessageMainPage from '@/pages/user/chat/MessageMainPage';
 
const ProtectedRoutes = (
  
  <Route element={<UserProtectedRoutes />}>
    <Route path="/home" element={<Home />} />
     
     
     <Route path="/user" element={<UserSearchAndMessage />} />
      <Route path="/profile" element={<Profile />} />



    <Route path='/chat' element={<ChatLayout />}>
      <Route path=":roomId" element={<MessageMainPage />} />
    </Route>


       <Route path="profile" element={<Profile />} />
      <Route path="verify-otp" element={<EmailOtpPage />} />

    

    </Route>
 );
export default ProtectedRoutes