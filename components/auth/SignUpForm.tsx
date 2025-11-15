
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../LoadingSpinner';

interface SignUpFormProps {
  onSwitchToLogin: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState<string|null>(null);
  const { signup, isLoading, error: authError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }
    setFormError(null);
    try {
      // FIX: Pass the 'name' argument to the signup function.
      await signup(name, email, password);
    } catch (err) {
       console.error("Signup failed:", err);
    }
  };
  
  const displayError = formError || authError;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {displayError && <p className="text-red-400 text-sm text-center">{displayError}</p>}
      <div>
        <label htmlFor="name-signup" className="block text-sm font-medium text-gray-300">Full name</label>
        <div className="mt-1">
          <input
            id="name-signup"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full appearance-none rounded-md border border-white/20 bg-slate-800/50 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <div>
        <label htmlFor="email-signup" className="block text-sm font-medium text-gray-300">Email address</label>
        <div className="mt-1">
          <input
            id="email-signup"
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
        <label htmlFor="password-signup" className="block text-sm font-medium text-gray-300">Password</label>
        <div className="mt-1">
          <input
            id="password-signup"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full appearance-none rounded-md border border-white/20 bg-slate-800/50 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      
       <div>
        <label htmlFor="confirm-password-signup" className="block text-sm font-medium text-gray-300">Confirm Password</label>
        <div className="mt-1">
          <input
            id="confirm-password-signup"
            name="confirm-password"
            type="password"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          {isLoading ? <><LoadingSpinner /> <span className="ml-2">Creating Account...</span></> : 'Create Account'}
        </button>
      </div>

       <p className="text-center text-sm text-gray-400">
        Already have an account?{' '}
        <button type="button" onClick={onSwitchToLogin} className="font-medium text-indigo-400 hover:text-indigo-300">
          Sign in
        </button>
      </p>
    </form>
  );
};

export default SignUpForm;
