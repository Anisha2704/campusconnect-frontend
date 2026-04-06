import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaCalendarAlt,
  FaClipboardList,
  FaBars,
  FaTimes
} from "react-icons/fa";

const StudentSidebar = ({ active, setActive }) => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Profile", icon: <FaUser />, path: "/student/profile" },
    { name: "Upcoming Events", icon: <FaCalendarAlt />, path: "/student/events" },
    { name: "My Events", icon: <FaClipboardList />, path: "/student/registeredevents" },
    { name: "FeedBack", icon: <FaClipboardList />, path: "/student/feedback" },
  ];

  const handleClick = (item) => {
    setActive(item.name);
    navigate(item.path);
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isOpen ? "w-64" : "w-16"
      } bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4 transition-all duration-300 overflow-y-auto`}
    >
      {/* Toggle Button */}
      <div className="flex items-center justify-between mb-8 mt-14">
        {isOpen && <h1 className="text-xl font-bold">Student Panel</h1>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 rounded hover:bg-gray-700 transition-colors"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Menu Items */}
      <ul className="flex-1 space-y-4">
        {menuItems.map((item, index) => (
          <li
            key={index}
            onClick={() => handleClick(item)}
            className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
              active === item.name ? "bg-blue-600 shadow-lg" : "hover:bg-gray-700"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {isOpen && <span className="font-medium">{item.name}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentSidebar;