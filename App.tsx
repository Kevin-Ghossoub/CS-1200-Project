
import React from 'react';
import { useAuth } from './context/AuthContext';
import { useAppContext } from './context/AppContext';

import Layout from './components/common/Layout';
import HomePage from './pages/HomePage';
import InsightsPage from './pages/InsightsPage';
import ProfilePage from './pages/ProfilePage';
import UserInputPage from './pages/UserInputPage';
import AIPlanPage from './pages/AIPlanPage';
import UploadFilePage from './pages/UploadFilePage';
import HealthTipsPage from './pages/HealthTipsPage';
import FeedbackPage from './pages/FeedbackPage';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import OnboardingPage from './pages/OnboardingPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';


const App: React.FC = () => {
  const { user } = useAuth();
  const { page } = useAppContext();

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage />;
      case 'insights':
        return <InsightsPage />;
      case 'profile':
        return <ProfilePage />;
      case 'userInput':
        return <UserInputPage />;
      case 'aiPlan':
        return <AIPlanPage />;
      case 'uploadFile':
        return <UploadFilePage />;
      case 'healthTips':
        return <HealthTipsPage />;
      case 'feedback':
        return <FeedbackPage />;
      case 'login':
        return <LoginPage />;
      case 'signup':
        return <SignUpPage />;
      case 'onboarding':
        return <OnboardingPage />;
      case 'forgotPassword':
        return <ForgotPasswordPage />;
      default:
        return <HomePage />;
    }
  };

  if (!user) {
     if (page === 'login') return <LoginPage />;
     if (page === 'signup') return <SignUpPage />;
     if (page === 'forgotPassword') return <ForgotPasswordPage />;
     return <WelcomePage />;
  }

  // These pages don't need the main layout with bottom nav
  if (page === 'aiPlan' || page === 'uploadFile' || page === 'healthTips' || page === 'feedback' || page === 'onboarding') {
    return <div className="h-screen w-screen bg-gray-50 flex justify-center"><div className="w-full max-w-md">{renderPage()}</div></div>
  }

  return (
    <Layout>
      {renderPage()}
    </Layout>
  );
};

export default App;
