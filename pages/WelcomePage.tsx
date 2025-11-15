
import React from 'react';
import { useAppContext } from '../context/AppContext';
import Button from '../components/common/Button';
import { HeartIcon } from '../components/icons';

const WelcomePage: React.FC = () => {
    const { setPage } = useAppContext();
    return (
        <div className="h-screen w-screen bg-gray-50 flex justify-center items-center">
            <div className="w-full max-w-md p-8 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                    <HeartIcon className="h-10 w-10" />
                </div>
                <h1 className="mt-6 text-4xl font-bold text-gray-900">Healify</h1>
                <p className="mt-2 text-lg text-gray-600">Your path to better health.</p>
                <div className="mt-12 space-y-4">
                    <Button fullWidth onClick={() => setPage('signup')}>Create Account</Button>
                    <Button fullWidth variant="secondary" onClick={() => setPage('login')}>Sign In</Button>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;
