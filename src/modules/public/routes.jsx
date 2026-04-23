import { Route } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import StudentLayout from "../../layouts/StudentLayout"; // tuzha layout
import StudentProfilePage from "../student/pages/StudentProfilePage";
import Events from "./pages/Events";
import About from "./pages/About";
import Contact from "./pages/Contact";
import EventDetailsPage from "./pages/EventDetails";

const PublicRoutes = (
  <Route element={<PublicLayout />}>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/events" element={<Events />} />
    <Route path="/events/:id" element={<EventDetailsPage />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
  </Route>
);

export default PublicRoutes;