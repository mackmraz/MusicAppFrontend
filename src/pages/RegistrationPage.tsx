import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../auth/axios';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [googleToken, setGoogleToken] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleGoogleSuccess = (resp: any) => {
    setGoogleToken(resp.credential);
  };

  const handleRegister = async () => {
    if (!googleToken) return setError('Please Sign In With Google first');
    try {
      const res = await axios.post('/register', { token: googleToken, username });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('refresh', res.data.refresh);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/profile');
    } catch (e: any) {
      setError(e.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex min-h-full items-center justify-center py-12">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow">
        <h2 className="text-center text-2xl font-bold">Create Your Account</h2>

        <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setError('Google sign-in failed')} />

        {googleToken && (
          <div className="space-y-4 mt-6">
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full rounded border px-3 py-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              onClick={handleRegister}
              className="w-full rounded bg-indigo-600 py-2 text-white hover:bg-indigo-700"
            >
              Register
            </button>
          </div>
        )}

        {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}

