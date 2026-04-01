// import { Outlet } from "react-router-dom";
// import AdminNavbar from "../modules/admin/components/AdminNavbar";
// import AdminSidebar from "../modules/admin/components/AdminSidebar";

// const AdminLayout = () => {
//   return (
//     <div className="flex h-screen">

//       {/* Sidebar */}
//       <AdminSidebar />

//       {/* Right Side */}
//       <div className="flex-1 flex flex-col">

//         {/* Navbar */}
//         <AdminNavbar />

//         {/* Dynamic Page Content */}
//         <div className=" mt-14 p-6 bg-soft flex-1 overflow-y-auto">
//           <Outlet />
//         </div>

//       </div>
//     </div>
//   );
// };

// export default AdminLayout;

import AdminNavbar from "../modules/admin/components/AdminNavbar";
import AdminSidebar from "../modules/admin/components/AdminSidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <AdminSidebar closeSidebar={() => setIsOpen(false)} />
      </div>

      {/* Mobile Sidebar (Overlay) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">

          {/* Sidebar */}
          <div className="w-64 bg-indigo-900">
            <AdminSidebar closeSidebar={() => setIsOpen(false)}/>
          </div>

          {/* Overlay */}
          <div
            className="flex-1 bg-black/40"
            onClick={() => setIsOpen(false)}
          ></div>

        </div>
      )}

      {/* Main Section */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <AdminNavbar toggleSidebar={() => setIsOpen(true)} />

        {/* Content */}
        <div className="p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </div>

      </div>

    </div>
  );
};

export default AdminLayout;