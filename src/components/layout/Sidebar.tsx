import React from 'react';
import Link from 'next/link';

const Sidebar: React.FC = () => {
  return (
    <div className="w-60 h-screen border-r border-gray-200 flex flex-col justify-between bg-white">
      <div>
        <div className="p-5">
          <h1 className="text-2xl font-bold">calmi</h1>
        </div>
        
        <nav className="mt-8">
          <ul className="space-y-4">
            <li>
              <Link href="/" className="flex items-center px-5 py-2 hover:bg-gray-100">
                <span className="mr-3">🏠</span>
                <span>home</span>
              </Link>
            </li>
            <li>
              <Link href="/profile" className="flex items-center px-5 py-2 hover:bg-gray-100">
                <span className="mr-3">📋</span>
                <span>profile</span>
              </Link>
            </li>
            <li>
              <Link href="/history" className="flex items-center px-5 py-2 hover:bg-gray-100">
                <span className="mr-3">⏱️</span>
                <span>session history</span>
              </Link>
            </li>
            <li>
              <Link href="/feedback" className="flex items-center px-5 py-2 hover:bg-gray-100">
                <span className="mr-3">👍</span>
                <span>feedback</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      
      <div className="p-5 space-y-4">
        <Link href="/settings" className="flex items-center hover:bg-gray-100 p-2">
          <span className="mr-3">⚙️</span>
          <span>settings</span>
        </Link>
        <Link href="/logout" className="flex items-center hover:bg-gray-100 p-2">
          <span className="mr-3">↪️</span>
          <span>log out</span>
        </Link>
        
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <span className="text-sm">free</span>
            <span className="text-sm">0/3 sessions</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div className="bg-calmi-orange h-2 rounded-full" style={{ width: '0%' }}></div>
          </div>
          <button className="w-full bg-calmi-orange text-black py-2 rounded mt-4">
            upgrade
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;