// import { Bell, Settings } from "lucide-react";

// const AdminNavbar = () => {
//   return (
//     <div className="ml-[258px] navbar">

//       {/* Left */}
//       <h2 className="text-lg font-semibold text-grad-primary">
//         Welcome, Admin 👋
//       </h2>

//       {/* Right */}
//       <div className="flex items-center gap-6">

//         {/* Notification */}
//         <button className="relative pill bg-white">
//           <Bell size={18} />
//           <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full animate-pulse-dot"></span>
//         </button>

//         {/* Settings */}
//         <button className="pill bg-white">
//           <Settings size={18} />
//         </button>

//         {/* Profile */}
//         <div className="flex items-center gap-3 cursor-pointer pill bg-white">

//           <div className="avatar bg-gradient-to-r from-indigo-500 to-purple-500">
//             A
//           </div>

//           <div className="flex flex-col leading-tight">
//             <span className="text-sm font-semibold">Admin</span>
//             <span className="text-xs text-gray-500">Super Admin</span>
//           </div>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default AdminNavbar;

import { Bell, Settings, Menu } from "lucide-react";

const AdminNavbar = ({ toggleSidebar }) => {
  return (
    <div className="w-full flex justify-between items-center p-4">

      {/* Left */}
      <div className="flex items-center gap-3">

        {/* Hamburger (ONLY MOBILE) */}
        <button
          className="md:hidden pill bg-white"
          onClick={toggleSidebar}
        >
          <Menu size={20} />
        </button>

        <h2 className="text-base sm:text-lg md:text-xl font-semibold text-grad-primary">
          Welcome, Admin 👋
        </h2>

      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-4 md:gap-6">

        <button className="relative pill bg-white">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full animate-pulse-dot"></span>
        </button>

        <button className="pill bg-white">
          <Settings size={18} />
        </button>

        <div className="flex items-center gap-2 md:gap-3 cursor-pointer pill bg-white">
          <div className="avatar bg-gradient-to-r from-indigo-500 to-purple-500">
            A
          </div>

          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm font-semibold">Admin</span>
            <span className="text-xs text-gray-500">Super Admin</span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminNavbar;