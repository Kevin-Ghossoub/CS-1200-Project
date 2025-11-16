
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';
import Button from '../components/common/Button';
import { ArrowLeftIcon, CheckIcon } from '../components/icons';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { resetPassword, isLoading, error } = useAuth();
  const { setPage } = useAppContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await resetPassword(email);
    setSubmitted(true);
  };

  if (submitted && !error) {
    return (
        <div className="h-screen bg-white p-6 flex flex-col justify-center items-center text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckIcon className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="mt-6 text-2xl font-bold text-gray-900">Request Sent</h1>
            <p className="mt-2 text-gray-600 max-w-sm">
                If an account with that email exists, we've sent a link to reset your password.
            </p>
            <div className="w-full max-w-sm mt-8">
                <Button fullWidth onClick={() => setPage('login')}>
                 Back to Sign in
                </Button>
            </div>
        </div>
    );
  }

  return (
    <div className="h-screen bg-white p-6">
       <header className="flex items-center">
        <button onClick={() => setPage('login')} className="p-2 -ml-2">
            <ArrowLeftIcon className="h-6 w-6 text-gray-500" />
        </button>
      </header>
      <div className="mt-12">
        <h1 className="text-3xl font-bold text-gray-900">Forgot Password?</h1>
        <p className="mt-2 text-gray-600">Enter your email and we'll send a link to reset your password.</p>
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
        
        <div className="pt-2">
          <Button type="submit" disabled={isLoading} fullWidth>
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
