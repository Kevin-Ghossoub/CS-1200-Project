
import React from 'react';
import { marked } from 'marked';
import { useAppContext } from '../context/AppContext';
import Button from '../components/common/Button';
import { ArrowLeftIcon, SparklesIcon } from '../components/icons';

const AIPlanPage: React.FC = () => {
    const { setPage, activePlan } = useAppContext();

    if (!activePlan) {
        return (
            <div className="p-6">
                <p>No active plan found.</p>
                <Button onClick={() => setPage('userInput')} className="mt-4">Go Back</Button>
            </div>
        );
    }
    
    const parsedContent = { __html: marked.parse(activePlan.content) };

    return (
        <div className="bg-white h-full p-6 flex flex-col">
            <header className="flex items-center">
                <button onClick={() => setPage('userInput')} className="p-2 -ml-2 mr-2">
                    <ArrowLeftIcon className="h-6 w-6 text-gray-500" />
                </button>
                <h1 className="text-xl font-bold text-gray-900">Your Personalized Plan</h1>
            </header>

            <div className="mt-8 flex-1">
                <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 text-sm font-semibold text-blue-700">
                        <SparklesIcon className="h-5 w-5" />
                        <span>AI-generated</span>
                    </div>
                    <div className="prose prose-sm mt-3 text-gray-800" dangerouslySetInnerHTML={parsedContent} />
                </div>
                
                <div className="mt-4 flex items-center gap-2">
                    {activePlan.tags.map(tag => (
                        <span key={tag} className="px-2.5 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">{tag}</span>
                    ))}
                </div>
            </div>

            <div className="mt-8 space-y-3">
                <Button fullWidth variant="secondary" onClick={() => setPage('feedback')}>Give Feedback</Button>
            </div>
        </div>
    );
};

export default AIPlanPage;
