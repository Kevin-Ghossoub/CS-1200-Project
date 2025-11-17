import React, { ReactNode } from 'react';
import BottomNav from './BottomNav';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen w-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-md h-full flex flex-col">
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
};

export default Layout;