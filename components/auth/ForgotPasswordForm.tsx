
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../LoadingSpinner';

interface ForgotPasswordFormProps {
  onSwitchToLogin: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { resetPassword, isLoading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await resetPassword(email);
    setSubmitted(true);
  };
  
  if (submitted && !error) {
    return (
        <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-200">Check your inbox</h2>
            <p className="mt-2 text-sm text-gray-400">
                If an account with that email exists, we've sent a link to reset your password.
            </p>
            <button type="button" onClick={onSwitchToLogin} className="mt-6 font-medium text-indigo-400 hover:text-indigo-300">
             &larr; Back to Sign in
            </button>
        </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <p className="text-sm text-gray-400 text-center">Enter your email and we'll send you a link to reset your password.</p>
      {error && <p className="text-red-400 text-sm text-center">{error}</p>}
      <div>
        <label htmlFor="email-forgot" className="block text-sm font-medium text-gray-300">Email address</label>
        <div className="mt-1">
          <input
            id="email-forgot"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full appearance-none rounded-md border border-white/20 bg-slate-800/50 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full justify-center items-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50"
        >
          {isLoading ? <><LoadingSpinner /> <span className="ml-2">Sending...</span></> : 'Send Reset Link'}
        </button>
      </div>

       <p className="text-center text-sm text-gray-400">
        Remembered your password?{' '}
        <button type="button" onClick={onSwitchToLogin} className="font-medium text-indigo-400 hover:text-indigo-300">
          Sign in
        </button>
      </p>
    </form>
  );
};

export default ForgotPasswordForm;