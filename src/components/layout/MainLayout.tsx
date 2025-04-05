import React from 'react';
import Sidebar from './Sidebar';
import { useState } from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  
  return (
    <div className="flex h-screen">
      {/* Mobile sidebar toggle */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-full bg-white shadow-md"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? '✕' : '☰'}
      </button>
      
      {/* Sidebar - hidden on mobile unless toggled */}
      <div className={`fixed inset-y-0 left-0 transform ${showSidebar ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition duration-200 ease-in-out lg:flex z-30`}>
        <Sidebar />
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="flex justify-end items-center p-5">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="mr-2">gen z mode</span>
              <div className="w-12 h-6 bg-gray-200 rounded-full p-1 cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <button className="rounded-full p-2">
              🌐
            </button>
          </div>
        </div>
        <main className="max-w-4xl mx-auto p-4">
          {children}
        </main>
      </div>
      
      {/* Backdrop for mobile sidebar */}
      {showSidebar && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setShowSidebar(false)}
        ></div>
      )}
    </div>
  );
};

export default MainLayout;