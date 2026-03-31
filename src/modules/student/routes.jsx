import { Route } from "react-router-dom";
import StudentLayout from "../../layouts/StudentLayout";
import StudentProfilePage from "./pages/StudentProfilePage";
// import StudentDashboard from "../pages/StudentDashboard";

const StudentRoutes = (
  <Route path="/student" element={<StudentLayout />}>
    
    {/* ✅ Default Dashboard */}
    <Route index element={<StudentProfilePage />} />

    {/* ✅ Other Pages */}
    <Route path="profile" element={<StudentProfilePage />} />

  </Route>
);

export default StudentRoutes;