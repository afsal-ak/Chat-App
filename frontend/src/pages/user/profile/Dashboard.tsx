// import type { IUser } from '@/types/IUser';
// import { Mail } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/Card';

// type Props = {
//   user?: IUser;
//   loading: boolean;
//   refetchUser: () => Promise<void>;
// };

// const Dashboard = ({ user, loading, refetchUser }: Props) => {
//   const profilePic = user?.profileImage?.url
//     ? user.profileImage.url.replace('/upload/', '/upload/f_webp,q_auto/')
//     : '/profile-default.jpg';

   

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 p-4">
//         <div className="max-w-4xl mx-auto">
//           <div className="animate-pulse space-y-6">
//             <div className="bg-white rounded-3xl shadow-xl p-8">
//               <div className="flex flex-col items-center space-y-4">
//                 <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
//                 <div className="space-y-2 text-center">
//                   <div className="h-6 bg-gray-200 rounded w-48"></div>
//                   <div className="h-4 bg-gray-200 rounded w-32"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 p-4">
//       <div className="max-w-4xl mx-auto space-y-6">
//         {/* Hero Profile Card */}
//         <div className="relative w-full bg-white rounded-3xl shadow-lg">
//           {/* Cover */}
//           <div className="w-full h-48 sm:h-56 md:h-64 relative">
// <div className="absolute inset-x-0 -bottom-16 flex justify-center">
//             <div className="relative group">
//               <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
//               <img
//                 src={profilePic}
//                 alt="Profile"
//                 className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-all duration-300"
//               />
//               {/* Online Dot */}
//               <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
//             </div>
//           </div>
//            </div>

           
//         </div>

//         {/* Spacer */}
//         <div className="h-20"></div>

//         {/* Profile Info */}
//         <Card className="bg-white rounded-3xl shadow-xl border-0 overflow-hidden hover:shadow-2xl transition-all duration-500">
//           <CardContent className="p-8 md:p-12">
//             <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
//               <div className="flex-1 text-center lg:text-left space-y-4">
//                 <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
//                   {user?.fullName || 'User Name'}
//                 </h1>
//                 <p className="text-lg text-orange-600 font-medium mb-1">
//                   @{user?.username || 'username'}
//                 </p>

//                 {user?.email && (
//                   <div className="flex items-center justify-center lg:justify-start gap-2 text-gray-600">
//                     <Mail className="w-4 h-4" />
//                     <span className="text-sm">{user.email}</span>
//                   </div>
//                 )}

//                 {user?.bio && (
//                   <p className="text-gray-700 leading-relaxed text-base max-w-2xl">{user.bio}</p>
//                 )}

                 
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//         </div>
//       </div>
//    );
// };

// export default Dashboard;
