
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';
import Button from '../components/common/Button';
import { ArrowLeftIcon } from '../components/icons';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuth();
  const { setPage } = useAppContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    // On success, AuthContext sets the user which triggers a redirect in AppContext.
    // On failure, AuthContext sets an error message which is displayed, and the user stays on this page.
  };

  return (
    <div className="h-screen bg-white p-6">
       <header className="flex items-center">
        <button onClick={() => setPage('welcome')} className="p-2 -ml-2">
            <ArrowLeftIcon className="h-6 w-6 text-gray-500" />
        </button>
      </header>
      <div className="mt-12">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
        <p className="mt-2 text-gray-600">Sign in to continue your health journey.</p>
      </div>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {error && <p className="text-red-500 text-sm text-center bg-red-100 p-3 rounded-lg">{error}</p>}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
            <div className="flex items-center justify-between">
                <label htmlFor="password"className="block text-sm font-medium text-gray-700">Password</label>
                <div className="text-sm">
                    <button type="button" onClick={() => setPage('forgotPassword')} className="font-medium text-blue-600 hover:text-blue-500">
                        Forgot password?
                    </button>
                </div>
            </div>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
        
        <div className="pt-2">
          <Button type="submit" disabled={isLoading} fullWidth>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
