
import React from 'react';
import { HomeIcon, BarChartIcon, UserCircleIcon } from '../icons';
import { useAppContext } from '../../context/AppContext';

const BottomNav: React.FC = () => {
  const { page, setPage } = useAppContext();

  const navItems = [
    { name: 'Home', icon: HomeIcon, page: 'home' },
    { name: 'Insights', icon: BarChartIcon, page: 'insights' },
    { name: 'Profile', icon: UserCircleIcon, page: 'profile' },
  ];

  return (
    <footer className="w-full max-w-md fixed bottom-0 bg-white border-t border-gray-200">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = page === item.page;
          return (
            <button
              key={item.name}
              onClick={() => setPage(item.page as 'home' | 'insights' | 'profile')}
              className={`flex flex-col items-center justify-center w-full h-full text-sm font-medium transition-colors ${
                isActive ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
              }`}
            >
              <item.icon className="h-6 w-6 mb-1" />
              {item.name}
            </button>
          );
        })}
      </div>
    </footer>
  );
};

export default BottomNav;
