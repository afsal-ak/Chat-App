import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useState, useEffect } from 'react';
import type { IUser } from '@/types/IUser';
import { getUserProfile } from '@/services/user/profileService';
import { toast } from 'sonner';
import EditProfileTab from './EditProfileTab';
import SecurityTab from './SecurityTab';
   const Profile = () => {
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState(true);

  const getUserInfo = async () => {
    try {
      setLoading(true);
      const response = await getUserProfile();
      setUser(response.userProfile);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Tabs defaultValue="edit" className="w-full">
        <TabsList className="flex gap-2 border-b mb-6 overflow-x-auto">
           <TabsTrigger value="edit">Edit Profile</TabsTrigger>
           <TabsTrigger value="security">Change Password</TabsTrigger>
        </TabsList>

        
        <TabsContent value="edit">
          <EditProfileTab user={user} loading={loading} refetchUser={getUserInfo} />
        </TabsContent>
        {/* <TabsContent value="address">
          <AddressTab user={user} loading={loading} refetchUser={getUserInfo} />
        </TabsContent> */}
        <TabsContent value="security">
          <SecurityTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default Profile