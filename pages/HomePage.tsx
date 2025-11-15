
import React from 'react';
import Page from '../components/common/Page';
import Button from '../components/common/Button';
import { HeartIcon } from '../components/icons';
import { useAppContext } from '../context/AppContext';

const HomePage: React.FC = () => {
  const { setPage } = useAppContext();

  return (
    <Page>
      <div className="rounded-2xl bg-blue-50 p-8 text-center mt-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
            <HeartIcon className="h-8 w-8" />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Healify</h1>
        <p className="mt-1 text-gray-600">Your path to better health.</p>
        <div className="mt-6">
            <Button onClick={() => setPage('userInput')}>Get Started</Button>
        </div>
      </div>
      <div className="text-center mt-4">
        <button onClick={() => setPage('userInput')} className="text-sm font-semibold text-gray-600 hover:text-gray-900">
            Continue to Main Input Screen
        </button>
      </div>
    </Page>
  );
};

export default HomePage;
