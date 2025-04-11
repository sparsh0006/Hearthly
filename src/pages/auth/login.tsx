// src/pages/auth/login.tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import LoginForm from '../../components/auth/LoginForm';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { redirect } = router.query;

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push(typeof redirect === 'string' ? redirect : '/');
    }
  }, [user, router, redirect]);

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-50 dark:bg-gray-900 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/">
          <div className="flex justify-center cursor-pointer">
            <div className="bg-calmi-orange w-16 h-16 rounded-full flex items-center justify-center">
              <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full"></div>
            </div>
          </div>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Sign in to Hearthly
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Or{' '}
          <Link href="/auth/register" className="font-medium text-calmi-orange hover:underline">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <LoginForm 
          redirectPath={typeof redirect === 'string' ? redirect : '/'}
        />
      </div>
    </div>
  );
};

export default LoginPage;