// src/components/auth/RegisterForm.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';

interface RegisterFormProps {
  onToggleMode?: () => void;
  redirectPath?: string;
  onSuccess?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ 
  onToggleMode, 
  redirectPath = '/session',
  onSuccess
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const { error } = await signUp(email, password, { full_name: fullName });
      
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
      setError(err.message || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900 dark:text-white">Create an Account</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="text-black dark:text-white w-full p-2 border dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-calmi-orange focus:border-transparent dark:bg-gray-700"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-black dark:text-white w-full p-2 border dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-calmi-orange focus:border-transparent dark:bg-gray-700"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-black dark:text-white w-full p-2 border dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-calmi-orange focus:border-transparent dark:bg-gray-700"
            required
          />
          <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Password must be at least 6 characters long
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full mb-4"
          disabled={loading}
        >
          {loading ? 'Creating account...' : 'Sign Up'}
        </Button>
        
        {onToggleMode && (
          <div className="text-center mt-4 text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onToggleMode}
              className="text-calmi-orange hover:underline"
            >
              Log in
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default RegisterForm;