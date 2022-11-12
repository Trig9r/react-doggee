import { Routes, Route, Navigate } from 'react-router-dom';

import { LoginPage } from '@pages/LoginPage';
import { RegistrationPage } from '@pages/RegistrationPage';
import { NotFoundPage } from '@pages/NotFoundPage';

export const AuthRoutes = () => (
  <Routes>
    <Route path="/auth" element={<LoginPage />} />
    <Route path="/registration" element={<RegistrationPage />} />
    <Route path="/*" element={<Navigate to="/auth" replace />} />
  </Routes>
);

export const MainRoutes = () => (
  <Routes>
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
