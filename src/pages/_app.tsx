// src/pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '../contexts/ThemeContext';
import { AuthProvider } from '../contexts/AuthContext';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  // Add a class to the html element for global styling
  useEffect(() => {
    // Function to handle system preference changes
    const handleSystemPreferenceChange = (e: MediaQueryListEvent) => {
      const isDarkMode = e.matches;
      const htmlElement = document.documentElement;
      
      if (isDarkMode) {
        htmlElement.classList.add('dark-theme');
        htmlElement.style.backgroundColor = '#000000';
        document.body.style.backgroundColor = '#000000';
      } else {
        htmlElement.classList.remove('dark-theme');
        htmlElement.style.backgroundColor = '#FFFFFF';
        document.body.style.backgroundColor = '#FFFFFF';
      }
    };

    // Check initial system preference
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('calmi-theme');
    
    if (savedTheme === 'dark' || (darkModeMediaQuery.matches && !savedTheme)) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.backgroundColor = '#000000';
      document.body.style.backgroundColor = '#000000';
    }
    
    // Add listener for changes
    darkModeMediaQuery.addEventListener('change', handleSystemPreferenceChange);
    
    return () => {
      darkModeMediaQuery.removeEventListener('change', handleSystemPreferenceChange);
    };
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        <Head>
          <title>Hearthly - your emotional companion</title>
          <meta name="description" content="An AI-powered therapy application" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="color-scheme" content="light dark" />
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp;