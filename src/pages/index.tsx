import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from '../components/auth/AuthModal';
import Button from '../components/ui/Button';
import AnimatedWave from '../components/ui/AnimatedWave';
import FAQAccordion from '../components/ui/FAQAccordian';
import SocialIcons from '../components/ui/SocialIcons';
import { ThemeToggle } from '../components/ui/Toggle';
import { useTheme } from '../contexts/ThemeContext';

// FAQ data
const faqItems = [
  {
    question: 'What is Hearthly?',
    answer: 'Hearthly is an AI-powered emotional companion that allows you to have meaningful conversations through voice or text. Our platform provides support, guidance, and a safe space to express your thoughts and feelings without judgment.'
  },
  {
    question: 'How does Hearthly work?',
    answer: 'Hearthly uses advanced AI technology to understand and respond to your conversations. Simply begin a session and start talking or typing about what\'s on your mind. The AI will respond empathetically and help you explore your thoughts and feelings in a supportive environment.'
  },
  {
    question: 'Is there a free plan?',
    answer: 'Yes! Hearthly offers 3 free sessions for all users. Each session can last up to 10 minutes. After using your free sessions, you can upgrade to a premium plan for unlimited access.'
  },
  {
    question: 'Can I cancel my subscription?',
    answer: 'Yes, you can cancel your subscription at any time from your profile settings. Your access will remain active until the end of your current billing period.'
  },
  {
    question: 'Is Hearthly a replacement for traditional therapy?',
    answer: 'While Hearthly provides valuable emotional support, it is not a replacement for professional mental health services. If you\'re experiencing severe mental health issues, please consult with a licensed therapist or healthcare provider.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit and debit cards, as well as PayPal for subscription payments. All transactions are processed securely through our payment processor.'
  },
  {
    question: 'Is my data secure and confidential?',
    answer: 'Yes, we take your privacy seriously. All conversations are encrypted and your personal information is protected according to our privacy policy. We do not share your data with third parties without your consent.'
  },
  {
    question: 'Does Hearthly support multiple languages?',
    answer: 'Currently, Hearthly supports English, with plans to expand to additional languages in the future. Stay tuned for updates on language support.'
  }
];

const IndexPage: React.FC = () => {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const router = useRouter();
  const { isDarkMode, toggleTheme } = useTheme();

  const handleBeginSession = () => {
    if (user) {
      router.push('/session');
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <>
      {/* Add these to the Head section in index.tsx */}
            <Head>
              <title>Hearthly - Your AI Emotional Companion</title>
              <meta name="description" content="Talk through your problems with ease using Hearthly, an AI-powered emotional companion available whenever you need support." />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <link rel="icon" href="/favicon.ico" />
              <meta name="color-scheme" content={isDarkMode ? 'dark' : 'light'} />
              <meta name="theme-color" content={isDarkMode ? '#000000' : '#FFFFFF'} />
              <style>{`
                body {
                  background-color: ${isDarkMode ? '#000000' : '#FFFFFF'};
                }
                html {
                  background-color: ${isDarkMode ? '#000000' : '#FFFFFF'};
                }
              `}</style>
            </Head>

      <div className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
              {/* Header */}
      <header className="px-5 py-4 fixed w-full z-10 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Hearthly</h1>
        <div className="flex items-center gap-4">
          <ThemeToggle 
            isDarkMode={isDarkMode}
            onToggle={toggleTheme}
          />
          {user ? (
            <button 
              onClick={() => router.push('/profile')}
              className="text-sm hover:underline"
            >
              Profile
            </button>
          ) : (
            <button 
              onClick={() => setShowAuthModal(true)}
              className="px-4 py-2 rounded-md border border-calmi-orange bg-white text-black hover:bg-gray-100 dark:bg-black dark:text-white dark:hover:bg-gray-900 transition-colors"
            >
              Login
            </button>
          )}
        </div>
      </header>


      {/* Hero Section */}
      <section className="relative pt-24 pb-36 md:pt-32 md:pb-32 px-5 bg-white dark:bg-black dark-bg-force force-bg-black" style={{backgroundColor: isDarkMode ? '#000000' : '#FFFFFF'}}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Talk through your problems with ease.
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
                {/* No high fees, no wait times, no downloads, no hassle— 
                just support with an empathetic AI whenever and wherever you need it. */}
              </p>
              <button 
                onClick={handleBeginSession}
                className="px-6 py-3 rounded-md bg-calmi-orange text-black font-medium hover:opacity-90 transition-opacity"
              >
                begin session
              </button>
            </div>
            
            <div className="relative h-64 md:h-80">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 bg-calmi-orange rounded-full flex items-center justify-center overflow-hidden">
                  <div className="w-32 h-32 bg-black dark:bg-gray-800 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wave Animation Section */}
      <section className="relative py-0 overflow-hidden bg-white dark:bg-black dark-bg-force force-bg-black" style={{backgroundColor: isDarkMode ? '#000000' : '#FFFFFF'}}>
        <div className="w-full">
          <AnimatedWave 
            height={200} 
            width={2000} 
            color="#B2A4FF" 
          />
        </div>
      </section>

                      {/* Features Section */}
      <section className="py-16 px-5 bg-white dark:bg-black" style={{backgroundColor: isDarkMode ? '#000000' : '#FFFFFF'}}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">How Hearthly Helps You</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white dark:bg-black rounded-lg border border-calmi-orange" style={{backgroundColor: isDarkMode ? '#000000' : '#FFFFFF'}}>
              <div className="w-12 h-12 bg-calmi-orange rounded-full flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">24/7 Availability</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Access emotional support anytime, day or night, without appointments or waiting lists.
              </p>
            </div>
            
            <div className="p-6 bg-white dark:bg-black rounded-lg border border-calmi-orange" style={{backgroundColor: isDarkMode ? '#000000' : '#FFFFFF'}}>
              <div className="w-12 h-12 bg-calmi-orange rounded-full flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Complete Privacy</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Share your thoughts in a safe, confidential space with no judgment or social anxiety.
              </p>
            </div>
            
            <div className="p-6 bg-white dark:bg-black rounded-lg border border-calmi-orange" style={{backgroundColor: isDarkMode ? '#000000' : '#FFFFFF'}}>
              <div className="w-12 h-12 bg-calmi-orange rounded-full flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Empathetic Listening</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Experience thoughtful responses that help you process emotions and gain new perspectives.
              </p>
            </div>
          </div>
        </div>
      </section>

            {/* FAQ Section */}
      <section className="py-16 px-5 bg-white dark:bg-black" style={{backgroundColor: isDarkMode ? '#000000' : '#FFFFFF'}}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          <FAQAccordion items={faqItems} />
        </div>
      </section>


        {/* CTA Section */}
        <section className="py-16 px-5 bg-white dark:bg-black">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Start Your Journey Today</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Begin with 3 free sessions and experience the support that thousands already trust.
            </p>
            <button 
              onClick={handleBeginSession}
              className="px-8 py-3 rounded-md bg-calmi-orange text-black font-medium hover:opacity-90 transition-opacity"
            >
              Begin Your First Session
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 px-5 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 bg-calmi-orange rounded-full mr-2"></div>
                  <span className="font-bold">Hearthly</span>
                </div>
                <SocialIcons className="mt-4" />
              </div>
              
              <div>
                <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h3>
                <nav>
                  <ul className="space-y-2">
                    <li><button onClick={handleBeginSession} className="hover:underline text-gray-600 dark:text-gray-300">Start Session</button></li>
                    <li><button onClick={() => router.push('/pricing')} className="hover:underline text-gray-600 dark:text-gray-300">Pricing</button></li>
                    <li><button onClick={() => router.push('/about')} className="hover:underline text-gray-600 dark:text-gray-300">About</button></li>
                    <li><button onClick={() => router.push('/contact')} className="hover:underline text-gray-600 dark:text-gray-300">Contact</button></li>
                  </ul>
                </nav>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Legal</h3>
                <nav>
                  <ul className="space-y-2">
                    <li><button onClick={() => router.push('/privacy-policy')} className="hover:underline text-gray-600 dark:text-gray-300">Privacy Policy</button></li>
                    <li><button onClick={() => router.push('/terms')} className="hover:underline text-gray-600 dark:text-gray-300">Terms of Service</button></li>
                    <li><button onClick={() => router.push('/disclaimer')} className="hover:underline text-gray-600 dark:text-gray-300">AI Disclaimer</button></li>
                  </ul>
                </nav>
              </div>
            </div>
            
            <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400 flex flex-col md:flex-row justify-between">
              <p>© 2025 Hearthly Inc</p>
              <p>Made with ❤️ for better mental wellness</p>
            </div>
          </div>
        </footer>

        {/* Auth Modal */}
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
          redirectPath="/session"
        />
      </div>
    </>
  );
};

export default IndexPage;