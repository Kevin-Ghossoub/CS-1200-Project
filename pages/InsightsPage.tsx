import React from 'react';
import Page from '../components/common/Page';
import { useAppContext } from '../context/AppContext';
import Button from '../components/common/Button';
import { TrashIcon } from '../components/icons';

const InsightsPage: React.FC = () => {
    const { history, deleteHistory } = useAppContext();

    const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        }
        if (date.toDateString() === yesterday.toDateString()) {
            return `Yesterday, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        }
        return date.toLocaleDateString();
    };

    return (
        <Page>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Prompt History</h1>
                {history.length > 0 && (
                    <Button variant="danger" onClick={deleteHistory}>
                        <TrashIcon className="h-4 w-4 mr-1.5" />
                        Delete all
                    </Button>
                )}
            </div>

            <div className="space-y-3">
                {history.length > 0 ? (
                    [...history].reverse().map((item, index) => (
                        <div key={item.id} className="p-4 bg-white rounded-lg border border-gray-200">
                            <p className="font-medium text-gray-800 truncate">{item.prompt}</p>
                            <p className="text-sm text-gray-500 mt-1">{formatDate(item.timestamp)}</p>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No history yet.</p>
                        <p className="text-gray-500 mt-1">Generate a plan to see your history here.</p>
                    </div>
                )}
            </div>
        </Page>
    );
};

export default InsightsPage;