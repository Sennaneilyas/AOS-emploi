import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ServicesPage from "../pages/ServicesPage";
import PortfolioPage from "../pages/PortfolioPage";
import BlogPage from "../pages/BlogPage";
import ContactPage from "../pages/ContactPage";
import EspaceAdherentPage from "../pages/EspaceAdherentPage";
import NotFoundPage from "../pages/NotFoundPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<Navigate to="/blog" replace />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/espace-adherent" element={<EspaceAdherentPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
