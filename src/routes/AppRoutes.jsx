import { BrowserRouter, Routes } from "react-router-dom"
import PublicRoutes from "../modules/public/routes";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
       {PublicRoutes}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;