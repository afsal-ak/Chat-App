import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '@/components/user/Navbar';
 import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from '@/redux/store';
import { useEffect } from 'react';
 import { useChatRoomsSocket } from '@/hooks/useChatRoomsSocket ';
import { useGlobalSocket } from '@/hooks/useGlobalSocket';
import { fetchUserRooms } from '@/redux/slices/chatRoomSlice';
const UserLayout = () => {

  const dispatch = useDispatch<AppDispatch>()
  const userId = useSelector((state: RootState) => state.userAuth.user?._id);
   useGlobalSocket(userId!);
  useChatRoomsSocket({ currentUserId: userId! });


  const location = useLocation();

     useEffect(() => {
    dispatch(fetchUserRooms({ isAdmin: false }))
  }, [])
  return (



    <div className="flex flex-col min-h-screen bg-background font-poppins text-foreground">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

  
    </div>
  );
};

export default UserLayout;
