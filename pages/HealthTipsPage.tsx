
import React from 'react';
import Button from '../components/common/Button';
import { ArrowLeftIcon } from '../components/icons';
import { useAppContext } from '../context/AppContext';

const articles = [
    { title: '5 Ways to Sleep Better', img: 'https://images.unsplash.com/photo-1595015888031-4803328f28a8?w=200&q=80' },
    { title: 'Quick Healthy Breakfast Ideas', img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=200&q=80' },
    { title: 'Hydration: How Much Water Do You Need?', img: 'https://images.unsplash.com/photo-1554422329-8a1078343f33?w=200&q=80' },
    { title: '10-Minute Home Workout', img: 'https://images.unsplash.com/photo-1599401228302-4c6b6f4e613f?w=200&q=80' }
];

const HealthTipsPage: React.FC = () => {
    const { setPage } = useAppContext();

    return (
        <div className="bg-white h-full p-6">
            <header className="flex items-center">
                <button onClick={() => setPage('aiPlan')} className="p-2 -ml-2 mr-2">
                    <ArrowLeftIcon className="h-6 w-6 text-gray-500" />
                </button>
                <h1 className="text-xl font-bold text-gray-900">Health Insights & Awareness</h1>
            </header>

            <div className="mt-6">
                <input 
                    type="search"
                    placeholder="Search health topics..."
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
            </div>
            
            <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-800">Recommended Articles</h2>
                <div className="mt-4 space-y-4">
                    {articles.map(article => (
                        <div key={article.title} className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                            <img src={article.img} alt={article.title} className="h-16 w-16 rounded-md object-cover" />
                            <div className="flex-1">
                                <p className="font-semibold text-gray-800">{article.title}</p>
                                <Button className="mt-2 !py-1 !px-3">Read More</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HealthTipsPage;
