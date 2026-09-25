import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../pages/Login/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import AppShell from "../components/layout/AppShell";

import DashboardPage from "../pages/Dashboard/DashboardPage";
import RecepcionTutelasPage from "../pages/Recepcion/RecepcionTutelasPage";
import ContestacionesPage from "../pages/Contestaciones/ContestacionesPage";
import GestionDocumentalPage from "../pages/Documental/GestionDocumentalPage";
import AlertasPage from "../pages/Alertas/AlertasPage";
import ReportesPage from "../pages/Reportes/ReportesPage";
import CumplimientoPage from "../pages/Cumplimiento/CumplimientoPage";
import GestionUsuariosPage from "../pages/Usuarios/GestionUsuariosPage";
import AnalisisRevisionPage from "../pages/AnalisisRevision/AnalisisRevisionPage";
import CentroRecursosPage from "../pages/CentroRecursos/CentroRecursosPage";
import PerfilPage from "../pages/Perfil/PerfilPage"; // <-- crea/usa esta página si ya la tienes

export default function AppRouter() {
  return (
    <Routes>
      <Route path={routes.login} element={<LoginPage />} />

      {/* Protegido (cualquier rol autenticado) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppShell />}>
          {/* ✅ Si entran a "/" estando logueados, los mandamos al dashboard */}
          <Route index element={<Navigate to={routes.dashboard} replace />} />

          <Route path={routes.dashboard} element={<DashboardPage />} />
          <Route path={routes.recepcion} element={<RecepcionTutelasPage />} />
          <Route path={routes.analisis} element={<AnalisisRevisionPage />} />
          <Route path={routes.contestaciones} element={<ContestacionesPage />} />
          <Route path={routes.documental} element={<GestionDocumentalPage />} />
          <Route path={routes.alertas} element={<AlertasPage />} />
          <Route path={routes.reportes} element={<ReportesPage />} />
          <Route path={routes.recursos} element={<CentroRecursosPage />} />
          <Route path={routes.perfil} element={<PerfilPage />} />
          <Route path={routes.cumplimiento} element={<CumplimientoPage />} />

          {/* Gestión usuarios solo Admin/EPS (abogados NO) */}
          <Route element={<ProtectedRoute allow={["ADMIN", "EPS"]} />}>
            <Route path={routes.usuarios} element={<GestionUsuariosPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
