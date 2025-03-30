import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import NavigationBar from './components/NavigationBar';
import { AuthProvider } from './auth/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID!}>
      <AuthProvider>
        <BrowserRouter>
          <NavigationBar />
          <main className="container mx-auto p-4">
            <AppRoutes />
          </main>
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;