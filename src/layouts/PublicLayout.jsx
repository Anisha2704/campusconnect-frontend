import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../modules/public/components/Navbar";
import Footer from "../modules/public/components/Footer";

const PublicLayout = () => {
  return (
    <div className="fade-in">

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div>
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default PublicLayout;