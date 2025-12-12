/**
 * Loading Component
 * Displays a loading spinner during app initialization
 */

import React from 'react';

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 to-secondary-500">
      <div className="text-center">
        <div className="spinner mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold text-white mb-2">CodeShare</h2>
        <p className="text-white/80">Loading your workspace...</p>
      </div>
    </div>
  );
};

export default Loading;
