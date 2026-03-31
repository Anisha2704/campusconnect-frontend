import { Route } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import StudentLayout from "../../layouts/StudentLayout"; // tuzha layout
import StudentProfilePage from "../student/pages/StudentProfilePage";

const PublicRoutes = (
  <Route element={<PublicLayout />}>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
  </Route>
);

export default PublicRoutes;