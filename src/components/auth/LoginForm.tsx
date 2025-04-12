// src/components/auth/LoginForm.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';

interface LoginFormProps {
  onToggleMode?: () => void;
  redirectPath?: string;
  onSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onToggleMode, 
  redirectPath = '/session',
  onSuccess
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        setError(error.message);
      } else {
        if (onSuccess) {
          onSuccess();
        } else {
          router.push(redirectPath);
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Login to Hearthly</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-black w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-calmi-orange focus:border-transparent"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-black w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-calmi-orange focus:border-transparent"
            required
          />
          <div className="mt-1 text-sm text-right">
            <a href="/auth/reset-password" className="text-calmi-orange hover:underline">
              Forgot password?
            </a>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full mb-4"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
        
        {onToggleMode && (
          <div className="text-center mt-4 text-sm">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onToggleMode}
              className="text-calmi-orange hover:underline"
            >
              Sign up
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginForm;