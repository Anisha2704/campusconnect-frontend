import { Outlet } from "react-router-dom";
import VendorSidebar from "../modules/Vendor/components/VendorSidebar";
import Navbar from "../modules/public/components/Navbar";

const VendorLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ✅ SIDEBAR */}
      <VendorSidebar />

      {/* ✅ MAIN CONTENT */}
      <div className="flex-1 flex flex-col">

        {/* 🔹 TOP NAVBAR */}
        <div className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Vendor Dashboard</h1>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* 🔹 PAGE CONTENT */}
        <div className="p-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default VendorLayout;