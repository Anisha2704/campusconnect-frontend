import { Route } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout" 
import LandingPage from "./pages/LandingPage"

const PublicRoutes = (
  <Route element={<PublicLayout />}>
    <Route path="/" element={<LandingPage />} />
  </Route>
);

export default PublicRoutes;