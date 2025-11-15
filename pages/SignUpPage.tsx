
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';
import Button from '../components/common/Button';
import { CheckIcon } from '../components/icons';

const SignUpPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState<string|null>(null);

  const { signup, isLoading, error: authError } = useAuth();
  const { setUserData } = useAppContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setFormError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }
    setFormError(null);
    try {
      const newUserData = await signup(name, email, password);
      setUserData(newUserData);
      // Auth context will handle navigation
    } catch (err) {
       console.error("Signup failed:", err);
    }
  };
  
  const displayError = formError || authError;

  const passwordRequirements = [
    { label: '8+ characters', met: password.length >= 8 },
    { label: 'Upper & lower', met: /[a-z]/.test(password) && /[A-Z]/.test(password) },
    { label: 'Number', met: /\d/.test(password) },
    { label: 'Symbol', met: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className="h-screen bg-white p-6">
        <header className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">Create Profile</h1>
            <span className="text-sm font-medium text-gray-500">Step 1 of 1</span>
        </header>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-2">
                <h2 className="text-lg font-semibold text-gray-800">Basic information</h2>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full name</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="Enter your name" />
                </div>
                <div>
                    <label htmlFor="email-signup" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email-signup" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="you@example.com" />
                </div>
            </div>
            
            <div className="space-y-2">
                <h2 className="text-lg font-semibold text-gray-800">Security</h2>
                <div>
                    <label htmlFor="password-signup" className="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" id="password-signup" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="Create a password" />
                </div>
                <div>
                    <label htmlFor="confirm-password-signup" className="block text-sm font-medium text-gray-700">Confirm</label>
                    <input type="password" id="confirm-password-signup" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="Re-enter password" />
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 pt-2">
                    {passwordRequirements.map(req => (
                        <div key={req.label} className={`flex items-center text-sm ${req.met ? 'text-green-600' : 'text-gray-500'}`}>
                            <CheckIcon className="h-4 w-4 mr-1.5" />
                            <span>{req.label}</span>
                        </div>
                    ))}
                </div>
            </div>
            
            {displayError && <p className="text-red-500 text-sm text-center bg-red-100 p-3 rounded-lg">{displayError}</p>}

            <div className="pt-4 flex items-center space-x-3">
                <Button type="button" variant="secondary" fullWidth onClick={() => useAppContext().setPage('welcome')}>Cancel</Button>
                <Button type="submit" disabled={isLoading} fullWidth>
                    {isLoading ? 'Creating...' : 'Create profile'}
                </Button>
            </div>
        </form>
    </div>
  );
};

export default SignUpPage;
