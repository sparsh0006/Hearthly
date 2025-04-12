import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiresAuth = true,
}) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Skip check if loading
    if (loading) {
      console.log("Auth is still loading...");
      return;
    }

    console.log("Auth check - User:", user?.id, "requiresAuth:", requiresAuth);

    // Logic for protected routes
    if (requiresAuth && !user) {
      console.log("Not authorized, redirecting to login");
      setError("Authentication required. Redirecting to login...");
      
      // Short delay to ensure console log shows up
      setTimeout(() => {
        router.push('/auth/login?redirect=' + encodeURIComponent(router.asPath));
      }, 300);
    } else {
      console.log("User is authorized");
      setIsAuthorized(true);
    }
  }, [user, loading, requiresAuth, router]);

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-calmi-orange mb-4"></div>
        <p>Checking authentication...</p>
      </div>
    );
  }

  // Show error if not authorized
  if (!isAuthorized) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-calmi-orange mb-4"></div>
        <p>{error || "Authorizing..."}</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;