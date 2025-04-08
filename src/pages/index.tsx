import React from 'react';
import Link from 'next/link';
import MainLayout from '../components/layout/MainLayout';

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)]">
        <h1 className="text-2xl mb-6">welcome to the late show!</h1>
        
        <div className="bg-calmi-orange w-48 h-48 rounded-full mb-10"></div>
        
        <Link href="/session" passHref>
          <button className="px-10 py-3 bg-calmi-orange rounded text-black font-medium">
            begin session
          </button>
        </Link>
      </div>
    </MainLayout>
  );
};

export default HomePage;