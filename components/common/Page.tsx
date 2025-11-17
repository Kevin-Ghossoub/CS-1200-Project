import React, { ReactNode } from 'react';

interface PageProps {
  children: ReactNode;
  className?: string;
}

const Page: React.FC<PageProps> = ({ children, className = '' }) => {
  return (
    <div className={`p-6 pb-24 ${className}`}>
      {children}
    </div>
  );
};

export default Page;