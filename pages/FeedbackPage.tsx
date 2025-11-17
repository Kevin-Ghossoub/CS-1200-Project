import React, { useState } from 'react';
import Button from '../components/common/Button';
import { ArrowLeftIcon } from '../components/icons';
import { useAppContext } from '../context/AppContext';

const FeedbackPage: React.FC = () => {
    const { setPage } = useAppContext();
    const [feedback, setFeedback] = useState('');
    const [support, setSupport] = useState<'support' | 'dont_support' | null>(null);

    const handleSubmit = () => {
        console.log({ support, feedback });
        alert('Thank you for your feedback!');
        setPage('userInput');
    };

    return (
        <div className="bg-white h-full p-6">
             <header className="flex items-center">
                <button onClick={() => setPage('aiPlan')} className="p-2 -ml-2 mr-2">
                    <ArrowLeftIcon className="h-6 w-6 text-gray-500" />
                </button>
                <h1 className="text-xl font-bold text-gray-900">Give Feedback</h1>
            </header>

            <div className="mt-8 p-5 bg-blue-50 rounded-lg border border-blue-200">
                <p className="font-semibold text-gray-800">Did this plan help you?</p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                    <Button variant={support === 'support' ? 'primary' : 'secondary'} onClick={() => setSupport('support')}>Support</Button>
                    <Button variant={support === 'dont_support' ? 'primary' : 'secondary'} onClick={() => setSupport('dont_support')}>Don't Support</Button>
                </div>
                <div className="mt-4">
                    <label htmlFor="feedback-text" className="block text-sm font-medium text-gray-700 sr-only">Add your feedback</label>
                    <textarea 
                        id="feedback-text"
                        rows={4}
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Add your feedback (optional)"
                    />
                </div>
            </div>
            <Button fullWidth className="mt-6" onClick={handleSubmit}>Submit Feedback</Button>
        </div>
    );
};

export default FeedbackPage;