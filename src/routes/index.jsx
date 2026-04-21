import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import StatutsPage from "../components/about/StatutsPage";
import ReglementPage from "../components/about/ReglementPage";
import BureauPage from "../components/about/BureauPage";
import ServicesPage from "../pages/ServicesPage";
import ServiceDetailPage from "../pages/ServiceDetailPage";
import ActualitiesPage from "../pages/ActualitiesPage";
import ActualitiesDetailPage from "../pages/ActualitiesDetailPage";
import ContactPage from "../pages/ContactPage";
import AuthPage from "../pages/AuthPage";
import EspaceAdherentPage from "../pages/EspaceAdherentPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "../components/auth/ProtectedRoute";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about/statuts" element={<StatutsPage />} />
      <Route path="/about/reglement" element={<ReglementPage />} />
      <Route path="/about/bureau" element={<BureauPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/services/:slug" element={<ServiceDetailPage />} />
      <Route path="/actualites" element={<ActualitiesPage />} />
      <Route path="/actualites/:slug" element={<ActualitiesDetailPage />} />
      <Route path="/contact" element={<ContactPage />} />
...

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