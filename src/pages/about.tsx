import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import MainLayout from '../components/layout/MainLayout';
import AnimatedWave from '../components/ui/AnimatedWave';

const AboutPage: React.FC = () => {
  const router = useRouter();

  return (
    <MainLayout>
      <Head>
        <title>About Hearthly - AI Emotional Companion</title>
        <meta name="description" content="Learn about Hearthly, our mission, and how our AI emotional companion can help support your mental wellness journey." />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">About Hearthly</h1>
        
        <div className="mb-10">
          <p className="text-lg mb-4">
            Hearthly is an innovative AI-powered therapy application designed to provide emotional support and companionship whenever you need it.
          </p>
          <p className="text-lg mb-4">
            Our mission is to make mental wellness support accessible to everyone, regardless of location, schedule, or financial constraints.
          </p>
        </div>
        
        <div className="relative h-40 my-12 overflow-hidden">
          <AnimatedWave height={160} color="#B2A4FF" />
        </div>
        
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Approach</h2>
            <p className="mb-3">
              Hearthly combines advanced AI technology with therapeutic principles to create a safe space for expression and reflection.
            </p>
            <p className="mb-3">
              Unlike traditional therapy, Hearthly is available 24/7, allowing you to connect and process your thoughts whenever you need to.
            </p>
            <p>
              We believe in the power of regular emotional check-ins and provide a judgment-free zone for exploring your feelings.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">How It Works</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Begin a session through voice or text</li>
              <li>Share what's on your mind with our AI companion</li>
              <li>Receive thoughtful, empathetic responses</li>
              <li>Explore your thoughts and gain new perspectives</li>
              <li>End the session whenever you're ready</li>
            </ol>
          </div>
        </div>
        
        <div className="mt-12 py-8 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-6">Our Values</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-5 rounded-lg bg-gray-50 dark:bg-gray-800">
              <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
              <p>Making mental wellness support available to everyone, everywhere, at any time.</p>
            </div>
            
            <div className="p-5 rounded-lg bg-gray-50 dark:bg-gray-800">
              <h3 className="text-xl font-semibold mb-2">Privacy</h3>
              <p>Ensuring your conversations remain confidential and your data secure.</p>
            </div>
            
            <div className="p-5 rounded-lg bg-gray-50 dark:bg-gray-800">
              <h3 className="text-xl font-semibold mb-2">Empathy</h3>
              <p>Providing compassionate, understanding responses that honor your experiences.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-6">Start Your Journey Today</h2>
          <button 
            onClick={() => router.push('/session')}
            className="px-6 py-3 bg-calmi-orange text-black rounded-md hover:bg-opacity-90 transition-all"
          >
            Begin a Session
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutPage;