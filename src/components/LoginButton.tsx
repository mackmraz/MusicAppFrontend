// src/components/LoginButton.tsx
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '@/auth/AuthContext';

export default function LoginButton() {
  const { setUser } = useAuth();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // Placeholder: Replace this URL with your backend endpoint when available
      const res = await fetch('http://localhost:8080/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Send token to your backend which handles verification & user creation
        body: JSON.stringify({ token: tokenResponse.access_token }),
        credentials: 'include', // if you're using cookies for sessions
      });

      if (res.ok) {
        const data = await res.json();
        // Update auth context with user info from the backend
        setUser(data.user);
      } else {
        console.error('Login failed');
      }
    },
    onError: () => console.log('Login Failed'),
  });

  return (
    <button onClick={() => login()} className="bg-blue-600 px-4 py-2 rounded">
      Sign in
    </button>
  );
}
