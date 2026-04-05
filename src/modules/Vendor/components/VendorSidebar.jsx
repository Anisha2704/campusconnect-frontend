import React from "react";
import { NavLink } from "react-router-dom";

const VendorSidebar = () => {
  return (
    <>
      {/* ✅ CSS inside same file */}
      <style>{`
        .sidebar {
          width: 260px;
          height: 100vh;
          background: #111827;
          color: white;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }

        .logo {
          font-size: 22px;
          font-weight: bold;
          text-align: center;
          margin-bottom: 30px;
        }

        .nav {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .link {
          padding: 12px;
          border-radius: 8px;
          text-decoration: none;
          color: white;
          transition: 0.2s;
        }

        .link:hover {
          background: #374151;
        }

        .active {
          background: #4f46e5;
        }
      `}</style>

      <div className="sidebar">

        {/* Logo */}
        <h2 className="logo">Vendor Panel</h2>

        {/* Navigation */}
        <nav className="nav">

          <NavLink
            to="/vendor"
            end
            className={({ isActive }) =>
              `link ${isActive ? "active" : ""}`
            }
          >
            📊 Dashboard
          </NavLink>

          <NavLink
            to="/vendor/edit-profile"
            className={({ isActive }) =>
              `link ${isActive ? "active" : ""}`
            }
          >
            ✏️ Edit Profile
          </NavLink>

          <NavLink
            to="/vendor/history"
            className={({ isActive }) =>
              `link ${isActive ? "active" : ""}`
            }
          >
            📜 History
          </NavLink>

        </nav>

      </div>
    </>
  );
};

export default VendorSidebar;