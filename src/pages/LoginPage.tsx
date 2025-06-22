import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from '../auth/axios';

export default function Login() {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse: any) => {
    const googleToken = credentialResponse.credential;

    try {
      const response = await axios.post('/login', { token: googleToken });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refresh', response.data.refresh);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      navigate('/profile');
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <>
      <section className="h-full">
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              alt="Your Company"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      disabled
                      placeholder="Login via Google only"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      disabled
                      placeholder="Login via Google only"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm/6 text-gray-500 italic">
                    Local login coming soon
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled
                    className="flex w-full justify-center rounded-md bg-gray-300 px-3 py-1.5 text-sm/6 font-semibold text-gray-700 cursor-not-allowed"
                  >
                    Sign in
                  </button>
                </div>
              </form>

              <div>
                <div className="relative mt-10">
                  <div aria-hidden="true" className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm/6 font-medium">
                    <span className="bg-white px-6 text-gray-900">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 ">
                  <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={() => console.log('Google Login Failed')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}