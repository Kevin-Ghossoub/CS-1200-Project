
import React, { useState } from 'react';
import Page from '../components/common/Page';
import Button from '../components/common/Button';
import { useAppContext } from '../context/AppContext';
import { generatePlan } from '../services/geminiService';
import { Plan } from '../types';

const UserInputPage: React.FC = () => {
    const { setPage, userData, setActivePlan, addHistoryItem } = useAppContext();
    const [goal, setGoal] = useState('');
    const [topic, setTopic] = useState('Sleep');
    const [isLoading, setIsLoading] = useState(false);

    const handleGeneratePlan = async () => {
        if (!goal.trim() || !userData) return;
        setIsLoading(true);
        try {
            const responseText = await generatePlan(goal, topic, userData, null);
            const planData = JSON.parse(responseText);
            
            const newPlan: Plan = {
                id: new Date().toISOString(),
                createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                ...planData
            };

            setActivePlan(newPlan);
            addHistoryItem({
                id: new Date().toISOString(),
                prompt: goal,
                timestamp: new Date().toISOString(),
            });
            setPage('aiPlan');

        } catch (error) {
            console.error("Failed to generate plan:", error);
            // Handle error state in UI
        } finally {
            setIsLoading(false);
        }
    };

    const healthTopics = ['Sleep', 'Fitness', 'Nutrition', 'Stress Management'];

    return (
        <Page>
            <h1 className="text-2xl font-bold text-gray-900">Tell us about your health</h1>
            <div className="mt-8 space-y-6">
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                    <label htmlFor="health-goal" className="block text-sm font-medium text-gray-700">Describe your health goal or concern...</label>
                    <textarea
                        id="health-goal"
                        rows={4}
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="E.g., Improve sleep quality and reduce waking up at night"
                    />
                </div>
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                    <label htmlFor="health-topic" className="block text-sm font-medium text-gray-700">Choose a health topic</label>
                    <select
                        id="health-topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                        {healthTopics.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>

                <Button fullWidth onClick={() => setPage('uploadFile')}>Upload File</Button>
                <Button fullWidth onClick={handleGeneratePlan} disabled={isLoading || !goal.trim()}>
                    {isLoading ? 'Generating...' : 'Generate Plan'}
                </Button>
            </div>
        </Page>
    );
};

export default UserInputPage;
