import { GoogleOAuthProvider } from '@react-oauth/google';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => (
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID!}>
    {children}
  </GoogleOAuthProvider>
);