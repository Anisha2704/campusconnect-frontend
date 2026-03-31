import { BrowserRouter, Routes } from "react-router-dom"
import PublicRoutes from "../modules/public/routes";
import StudentRoutes from "../modules/student/routes";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
       {PublicRoutes}
       {StudentRoutes}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;