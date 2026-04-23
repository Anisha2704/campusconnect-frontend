import { NavLink } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { X } from "lucide-react";

const VendorSidebar = ({ isOpen, setIsOpen, mobileOpen, setMobileOpen }) => {
  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaIcons.FaTachometerAlt />,
      path: "/vendor",
    },
    {
      name: "Edit Profile",
      icon: <FaIcons.FaUserEdit />,
      path: "/vendor/edit-profile",
    },
    {
      name: "History",
      icon: <FaIcons.FaHistory />,
      path: "/vendor/history",
    },
  ];

  return (
    <>
      {/* ✅ Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ✅ Sidebar */}
      <div
        className={`
          sidebar fixed top-0 left-0 h-full z-50
          transition-transform duration-300 ease-in-out

          /* ✅ FIXED MOBILE BEHAVIOR */
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0

          /* desktop width */
          ${isOpen ? "md:w-64" : "md:w-16"}
          w-64
        `}
      >
        {/* 🔝 Header */}
        <div className="flex items-center justify-between mb-8 mt-2 px-2">
          
          {isOpen && (
            <h2 className="text-white text-lg font-bold whitespace-nowrap">
              Vendor Panel
            </h2>
          )}

          <div className="flex items-center gap-2">

            {/* ❌ Close mobile */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileOpen(false)}
            >
              <X size={20} />
            </button>

            {/* 🔄 Toggle desktop */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="sidebar-toggle text-white hidden md:block"
            >
              <FaIcons.FaBars />
            </button>

          </div>
        </div>

        {/* 📋 Menu */}
        <ul className="space-y-2 px-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                end={item.path === "/vendor"}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `sidebar-item ${
                    isActive ? "sidebar-item-active" : ""
                  }`
                }
              >
                <span className="text-lg text-white">
                  {item.icon}
                </span>

                {/* show text only when expanded */}
                {isOpen && (
                  <span className="text-white font-medium">
                    {item.name}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default VendorSidebar;