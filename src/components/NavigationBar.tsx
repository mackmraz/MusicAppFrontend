// src/components/NavigationBar.tsx
import { Link } from 'react-router-dom';
import { useAuth } from '@/auth/AuthContext';
import LoginButton from './LoginButton';

export default function NavigationBar() {
  const { user } = useAuth();

  return (
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <div className="flex space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/feed" className="hover:underline">
            Feed
          </Link>
          {user && (
            <Link to="/profile" className="hover:underline">
              Profile
            </Link>
          )}
        </div>
        <div>
          {/* If the user is logged in, you could show an avatar or a logout button.
              For now, we simply show the LoginButton if no user is present. */}
          {!user ? <LoginButton /> : <span>Welcome, {user.displayName}</span>}
        </div>
      </nav>
    </header>
  );
}
