// src/pages/Login.tsx
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from '../auth/axios';

export default function Login() {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse: any) => {
    const googleToken = credentialResponse.credential;

    try {
      const response = await axios.post('/login', { token: googleToken });

      // Save JWT
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refresh', response.data.refresh);
      // Optionally save user
      localStorage.setItem('user', JSON.stringify(response.data.user));

      navigate('/profile');
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">Login</h1>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log('Login Failed')}
      />
    </div>
  );
}
