import { useState } from "react";
import { Outlet } from "react-router-dom";
import VendorSidebar from "../modules/Vendor/components/VendorSidebar";
import Navbar from "../modules/public/components/Navbar";

const VendorLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* ✅ Sidebar */}
      <VendorSidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Right Side (Navbar + Content) */}
      <div className="flex flex-col flex-1">

        {/* ✅ Fixed Navbar (above everything except mobile sidebar) */}
        <header className="fixed top-0 left-0 right-0 h-[64px] bg-white z-[90] border-b shadow-sm">
          <Navbar toggleSidebar={() => setMobileOpen(true)} />
        </header>

        {/* Spacer for fixed navbar */}
        <div className="h-[64px]" />

        {/* Main Content */}
        <main
          className={`flex-1 overflow-y-auto transition-all duration-300 p-4 md:p-6
          ${isOpen ? "md:ml-64" : "md:ml-16"}`}
        >
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default VendorLayout;