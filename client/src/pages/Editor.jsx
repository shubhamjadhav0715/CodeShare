/**
 * Editor Page
 * Real-time collaborative code editor (placeholder for now)
 */

import React from 'react';
import { useParams } from 'react-router-dom';
import { FiCode } from 'react-icons/fi';

const Editor = () => {
  const { projectId } = useParams();

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center text-white">
        <FiCode className="text-8xl mx-auto mb-6 text-primary-400" />
        <h1 className="text-4xl font-bold mb-4">Code Editor</h1>
        <p className="text-xl text-gray-400 mb-2">Project ID: {projectId}</p>
        <p className="text-gray-500">
          Monaco Editor integration coming in next update! 🚀
        </p>
      </div>
    </div>
  );
};

export default Editor;
