import { Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import SearchPage from '@/pages/MusicSearchPage';
import ProfilePage from '@/pages/ProfilePage';
import LoginPage from '@/pages/LoginPage';
import PrivateRoute from '@/auth/PrivateRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}