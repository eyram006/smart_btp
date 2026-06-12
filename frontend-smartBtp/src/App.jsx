import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

/* ── Auth ── */
import LoginPage          from './modules/auth/pages/LoginPage';
import RegisterPage       from './modules/auth/pages/RegisterPage';
import ForgotPasswordPage from './modules/auth/pages/ForgotPasswordPage';

/* ── Layout ── */
import DashboardLayout from './layouts/DashboardLayout';

/* ── Modules ── */
import DashboardPage     from './modules/dashboard/pages/DashboardPage';
import EtapesPage        from './modules/etapes/pages/EtapesPage';
import MouvementsPage    from './modules/stocks/pages/MouvementsPage';
import StocksPage        from './modules/stocks/pages/StocksPage';
import ChantiersPage     from './modules/chantiers/pages/ChantiersPage';
import CreateChantierPage from './modules/chantiers/pages/CreateChantierPage';
import CreateMateriauPage from './modules/materiaux/pages/CreateMateriauPage';

export default function App() {
  return (
    <Router>
      <Routes>

        {/* ── Pages publiques (auth) ── */}
        <Route path="/login"           element={<LoginPage />} />
        <Route path="/register"        element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* ── Pages protégées (dashboard layout) ── */}
        <Route element={<DashboardLayout />}>
          {/* Dashboard */}
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Chantiers */}
          <Route path="/chantiers"          element={<ChantiersPage />} />
          <Route path="/chantiers/nouveau"  element={<CreateChantierPage />} />

          {/* Matériaux */}
          <Route path="/chantiers/:chantierId/materiaux/nouveau" element={<CreateMateriauPage />} />

          {/* Etapes */}
          <Route path="/chantiers/:chantierId/etapes" element={<EtapesPage />} />

          {/* Mouvements */}
          <Route path="/mouvements"                       element={<MouvementsPage />} />
          <Route path="/chantiers/:chantierId/mouvements" element={<MouvementsPage />} />

          {/* Stocks */}
          <Route path="/chantiers/:chantierId/stocks" element={<StocksPage />} />
        </Route>

        {/* ── Fallback ── */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </Router>
  );
}
