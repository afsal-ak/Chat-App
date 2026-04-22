import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Link,useNavigate } from 'react-router-dom';
import { Menu, User, X, Bell, MessageCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '@/redux/slices/userAuthSlice';
import type { AppDispatch, RootState } from '@/redux/store';
import { toast } from 'sonner';
import { useTotalUnreadCount } from '@/hooks/useTotalUnreadCount';
  const Navbar = () => {
    const navigate=useNavigate()
  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated, accessToken, user } = useSelector(
    (state: RootState) => state.userAuth
  );

 
const totalChatUnread =useTotalUnreadCount(user?._id!)

 
  useEffect(() => {
    if (!accessToken) {
      dispatch(logoutUser());
      navigate('/login')
    }
  }, [accessToken, dispatch]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const profileImage = user?.profileImage?.url
    ? user.profileImage.url.replace('/upload/', '/upload/f_webp,q_auto/')
    : '/profile-default.jpg';

  return (
    <header className="bg-background shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left - Logo & Links */}
          <div className="flex items-center space-x-8">
            <Link to="/chat" className="text-2xl font-bold">
              <span className="text-blue-600">Chatify</span>
            </Link>

             
          </div>

          {/* Right - Icons & Auth */}
          <div className="flex items-center space-x-4">
             

            

            {isAuthenticated ? (
              <div className="relative hidden sm:flex items-center group">
                {/* Profile Dropdown */}
                <button className="flex items-center space-x-2 focus:outline-none">
                  <div className="flex items-center justify-center">
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                  </div>
                </button>

                <div className="absolute top-full right-0 mt-2 w-44 bg-white shadow-md rounded-md border opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-200 z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Profile
                  </Link>
                 
                  <button
                    onClick={() => {
                      dispatch(logoutUser());
                      toast.success('Logout successful');
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="border-blue text-blue-500 hover:bg-blue hover:text-white hidden sm:flex"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-blue-500 hover:bg-blue-dark text-white hidden sm:flex">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
             
            
             
            <Link
              to="/profile"
              className="block text-foreground hover:text-orange"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Account
            </Link>
            {isAuthenticated ? (
              <button
                onClick={() => {
                  dispatch(logoutUser());
                  toast.success('Logout successful');
                  setIsMobileMenuOpen(false);
                }}
                className="block text-red-500 font-semibold"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-orange font-semibold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block text-orange font-semibold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
