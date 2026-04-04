import { Route } from "react-router-dom";
import VendorDashboard from "./pages/VendorDashboard";
import VendorLayout from "../../layouts/VendorLayout";
import EditProfile from "./pages/EditProfile";
import VendorHistory from "./pages/VendorHistory";

const VendorRoutes = (
  <Route path="/vendor" element={<VendorLayout />}>

    {/* ✅ Default Dashboard */}
    <Route index element={<VendorDashboard />} />

    {/* ✅ Optional Dashboard URL */}
    <Route path="dashboard" element={<VendorDashboard />} />

    {/* ✅ Edit Profile */}
    <Route path="edit-profile" element={<EditProfile />} />

    {/* ✅ History */}
    <Route path="history" element={<VendorHistory />} />

  </Route>
);

export default VendorRoutes;