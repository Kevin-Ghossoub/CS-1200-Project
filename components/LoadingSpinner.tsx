
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 p-1 animate-spin">
       <div className="h-full w-full rounded-full bg-slate-700/50"></div>
    </div>
  );
};

export default LoadingSpinner;
