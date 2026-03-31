import { Outlet } from "react-router-dom";
import { useState } from "react";
import StudentSidebar from "../modules/student/components/StudentSidebar";
import Navbar from "../modules/public/components/Navbar";
import Footer from "../modules/public/components/Footer";


export default function StudentLayout() {
  const [active, setActive] = useState("Profile");

  return (
    <div className="flex min-h-screen">
      <Navbar />
      <StudentSidebar active={active} setActive={setActive} />
      <div className="flex-1 p-6 bg-gray-100 my-16">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  );
}