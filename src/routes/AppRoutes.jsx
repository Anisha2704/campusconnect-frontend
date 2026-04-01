import { BrowserRouter, Routes, Route } from "react-router-dom"
import PublicRoutes from "../modules/public/routes";
import StudentRoutes from "../modules/student/routes";
import AdminRoutes from "../modules/admin/routes";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
       {PublicRoutes}
       {StudentRoutes}
       <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;