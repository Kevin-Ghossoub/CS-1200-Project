
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import { SparklesIcon } from '../icons';

type AuthView = 'login' | 'signup' | 'forgot';

const AuthPage: React.FC = () => {
  const [view, setView] = useState<AuthView>('login');

  const renderForm = () => {
    switch (view) {
      case 'login':
        return <LoginForm onSwitchToSignUp={() => setView('signup')} onSwitchToForgot={() => setView('forgot')} />;
      case 'signup':
        return <SignUpForm onSwitchToLogin={() => setView('login')} />;
      case 'forgot':
        return <ForgotPasswordForm onSwitchToLogin={() => setView('login')} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-8 rounded-2xl border border-white/10 bg-black/20 shadow-2xl backdrop-blur-lg">
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600">
            <SparklesIcon className="h-7 w-7 text-white" />
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-100">Welcome to Aura</h1>
        <p className="mt-2 text-gray-400">Your personal AI health advisor</p>
      </div>
      {renderForm()}
    </div>
  );
};

export default AuthPage;