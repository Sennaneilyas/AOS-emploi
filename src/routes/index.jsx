import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ServicesPage from "../pages/ServicesPage";
import PortfolioPage from "../pages/PortfolioPage";
import BlogPage from "../pages/BlogPage";
import ContactPage from "../pages/ContactPage";
import AuthPage from "../pages/AuthPage";
import EspaceAdherentPage from "../pages/EspaceAdherentPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "../components/auth/ProtectedRoute";

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

      {/* Auth */}
      <Route path="/auth" element={<AuthPage />} />

      {/* Protected */}
      <Route
        path="/espace-adherent"
        element={
          <ProtectedRoute>
            <EspaceAdherentPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}