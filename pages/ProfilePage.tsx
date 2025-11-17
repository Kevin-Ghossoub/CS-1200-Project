import React, { useState } from 'react';
import Page from '../components/common/Page';
import Button from '../components/common/Button';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

const ProfilePage: React.FC = () => {
    const { userData, setUserData } = useAppContext();
    const { logout } = useAuth();
    
    const [name, setName] = useState(userData?.name || '');
    const [age, setAge] = useState(userData?.age || 0);
    const [weight, setWeight] = useState(userData?.weight || 0);
    const [goals, setGoals] = useState(userData?.goals || '');
    
    const handleSaveChanges = () => {
        if (userData) {
            setUserData({ ...userData, name, age, weight, goals });
            alert("Profile saved!");
        }
    };

    return (
        <Page>    
            <div className="mt-8 space-y-4">
                <div>
                    <h1 className="text-xl font-bold text-gray-900"> Profile</h1>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Age</label>
                    <input type="number" value={age} onChange={e => setAge(Number(e.target.value))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                    <input type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Health Goals</label>
                    <input type="text" value={goals} onChange={e => setGoals(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="e.g., Improve sleep & daily energy" />
                </div>
                <Button fullWidth onClick={handleSaveChanges}>Save Changes</Button>
            </div>      
            <div className="mt-8">
                 <Button fullWidth variant="secondary" onClick={logout}>Logout</Button>
            </div>
        </Page>
    );
};

export default ProfilePage;