import React from 'react';
import Link from 'next/link';
import { 
  HomeIcon, 
  ProfileIcon, 
  HistoryIcon, 
  FeedbackIcon, 
  SettingsIcon, 
  LogoutIcon 
} from '../ui/Icons';
import { useSession } from '../../hooks/useSession';

interface SidebarProps {
  isDarkMode?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isDarkMode = false }) => {
  const { sessionCount } = useSession();
  
  return (
    <div className={`w-60 h-screen border-r ${isDarkMode ? 'border-gray-700 bg-calmi-dark-secondary text-white' : 'border-gray-200 bg-white text-gray-900'} flex flex-col justify-between`}>
      <div>
        <div className="p-5">
          <h1 className="text-2xl font-bold">Hearthly </h1>
        </div>
        
        <nav className="mt-8">
          <ul className="space-y-4">
            <li>
              <Link href="/" className={`flex items-center px-5 py-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                <HomeIcon className="mr-3" size={20} color={isDarkMode ? 'white' : 'black'} />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link href="/profile" className={`flex items-center px-5 py-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                <ProfileIcon className="mr-3" size={20} color={isDarkMode ? 'white' : 'black'} />
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link href="/history" className={`flex items-center px-5 py-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                <HistoryIcon className="mr-3" size={20} color={isDarkMode ? 'white' : 'black'} />
                <span>Session History</span>
              </Link>
            </li>
            <li>
              <Link href="/feedback" className={`flex items-center px-5 py-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                <FeedbackIcon className="mr-3" size={20} color={isDarkMode ? 'white' : 'black'} />
                <span>Feedback</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      
      <div className="p-5 space-y-4">
        <Link href="/settings" className={`flex items-center ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} p-2`}>
          <SettingsIcon className="mr-3" size={20} color={isDarkMode ? 'white' : 'black'} />
          <span>Settings</span>
        </Link>
        <Link href="/logout" className={`flex items-center ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} p-2`}>
          <LogoutIcon className="mr-3" size={20} color={isDarkMode ? 'white' : 'black'} />
          <span>Log out</span>
        </Link>
        
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <span className="text-sm">Free</span>
            <span className="text-sm">{sessionCount}/3 sessions</span>
          </div>
          <div className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2 mt-2`}>
            <div className="bg-calmi-orange h-2 rounded-full" style={{ width: `${(sessionCount / 3) * 100}%` }}></div>
          </div>
          <button className="w-full bg-calmi-orange text-black py-2 rounded mt-4 font-medium">
            upgrade
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;