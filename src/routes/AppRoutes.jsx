import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRoutes from "../modules/public/routes";
import StudentRoutes from "../modules/student/routes";
import AdminRoutes from "../modules/admin/routes";
import VendorLayout from "../layouts/VendorLayout";
import VendorDashboard from "../modules/Vendor/pages/VendorDashboard";
import EditProfile from "../modules/Vendor/pages/EditProfile";
import VendorHistory from "../modules/Vendor/pages/VendorHistory";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ✅ Public Routes */}
        {PublicRoutes}

        {/* ✅ Vendor Routes (FIXED) */}
        <Route path="/vendor" element={<VendorLayout />}>
          <Route index element={<VendorDashboard />} />
          <Route path="dashboard" element={<VendorDashboard />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="history" element={<VendorHistory />} />
        </Route>

        {/* ✅ Student Routes */}
        {StudentRoutes}

        {/* ✅ Admin Routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;