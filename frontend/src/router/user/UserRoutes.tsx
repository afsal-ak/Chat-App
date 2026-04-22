import { Routes, Route } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
 import ProtectedRoutes from './ProtectedRoutes';
import UserLayout from '@/layouts/UserLayout';
import NotFoundPage from '@/components/NotFoundPage';
const UserRoutes = () => {
  return (
    <Routes>
      {PublicRoutes}

      <Route element={<UserLayout />}>
 
        {ProtectedRoutes}
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default UserRoutes;
