import { Routes, Route } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout" 
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";

const AdminRoutes = () => {
  return (
    <Routes>

      {/* Parent Route */}
      <Route path="/" element={<AdminLayout />}>

        {/* Child Routes */}
        <Route path="" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
      </Route>

    </Routes>
  );
};

export default AdminRoutes;