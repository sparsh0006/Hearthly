import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';

const LogoutPage = () => {
  const { signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await signOut();
      } catch (error) {
        console.error('Error during logout:', error);
      } finally {
        router.push('/');
      }
    };

    performLogout();
  }, [signOut, router]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-calmi-orange mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-300">Logging out...</p>
      </div>
    </div>
  );
};

export default LogoutPage;