
import React, { useState } from 'react';
import Page from '../components/common/Page';
import Button from '../components/common/Button';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

const ProfilePage: React.FC = () => {
    const { userData, setUserData, savedPlans } = useAppContext();
    const { logout } = useAuth();
    
    // Local state for editing
    const [name, setName] = useState(userData?.name || '');
    const [age, setAge] = useState(userData?.age || 0);
    const [weight, setWeight] = useState(userData?.weight || 0);
    // FIX: Change 'healthGoal' to 'goals' to align with the UserData type.
    const [goals, setGoals] = useState(userData?.goals || '');
    
    const handleSaveChanges = () => {
        if (userData) {
            // FIX: Save 'goals' instead of 'healthGoal'.
            setUserData({ ...userData, name, age, weight, goals });
            alert("Profile saved!");
        }
    };

    return (
        <Page>
            <div className="text-center">
                <img src={userData?.avatar} alt="User Avatar" className="w-24 h-24 rounded-full mx-auto" />
                <Button variant="secondary" className="mt-4">Edit Profile</Button>
            </div>

            <div className="mt-8 space-y-4">
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
                <h2 className="text-lg font-semibold text-gray-900">Saved Plans</h2>
                <div className="mt-4 space-y-3">
                    {savedPlans.length > 0 ? savedPlans.map(plan => (
                        <div key={plan.id} className="p-3 bg-white rounded-lg border border-gray-200">
                           <p className="font-semibold">{plan.title}</p>
                           <p className="text-sm text-gray-500">Created {plan.createdAt}</p>
                        </div>
                    )) : (
                        <p className="text-sm text-gray-500">No plans saved yet.</p>
                    )}
                </div>
            </div>
            
            <div className="mt-8">
                 <Button fullWidth variant="secondary" onClick={logout}>Logout</Button>
            </div>
        </Page>
    );
};

export default ProfilePage;
