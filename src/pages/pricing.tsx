// src/pages/pricing.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import MainLayout from '../components/layout/MainLayout';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from '../components/auth/AuthModal';

// Pricing plans data
const plans = [
  {
    name: 'Free Plan',
    price: '$0',
    interval: '',
    features: [
      '3 therapy sessions per month',
      'Basic chat features',
      'Standard response time',
      'Email support'
    ],
    buttonText: 'Current Plan',
    current: true,
    highlighted: false
  },
  {
    name: 'Premium',
    price: '$9.99',
    interval: 'month',
    features: [
      'Unlimited therapy sessions',
      'Advanced conversation analysis',
      'Priority response time',
      'Email & chat support',
      'Progress tracking'
    ],
    buttonText: 'Upgrade Now',
    current: false,
    highlighted: true
  },
  {
    name: 'Annual Plan',
    price: '$99.99',
    interval: 'year',
    features: [
      'Everything in Premium',
      'Save 16% compared to monthly',
      'Exclusive content & exercises',
      'Phone support',
      'Wellness webinars'
    ],
    buttonText: 'Upgrade Now',
    current: false,
    highlighted: false
  }
];

const PricingPage: React.FC = () => {
  const { user, remainingSessions } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const router = useRouter();

  const handleUpgrade = (planName: string) => {
    // For demo purposes, just show auth modal if not logged in
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    // In a real implementation, redirect to a checkout page
    alert(`You selected the ${planName}. This would redirect to a payment processor.`);
  };

  return (
    <MainLayout>
      <div className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Pricing Plans
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
            Choose the perfect plan for your mental wellness journey
          </p>
        </div>

        <div className="mt-12 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.name} 
              className={`relative p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg ${
                plan.highlighted ? 'border-2 border-calmi-orange ring-2 ring-calmi-orange ring-opacity-50' : ''
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="inline-flex rounded-full bg-calmi-orange px-4 py-1 text-sm font-semibold text-black">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center">
                <h3 className="text-2xl font-medium text-gray-900 dark:text-white">{plan.name}</h3>
                <div className="mt-4 flex justify-center items-baseline">
                  <span className="text-5xl font-extrabold text-gray-900 dark:text-white">{plan.price}</span>
                  {plan.interval && (
                    <span className="ml-1 text-xl font-medium text-gray-500 dark:text-gray-400 self-end">
                      /{plan.interval}
                    </span>
                  )}
                </div>
                
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <p className="ml-3 text-base text-gray-500 dark:text-gray-300">
                        {feature}
                      </p>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8">
                  {plan.current ? (
                    <div className="rounded-md shadow">
                      <span className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                        {remainingSessions}/3 sessions remaining
                      </span>
                    </div>
                  ) : (
                    <Button
                      onClick={() => handleUpgrade(plan.name)}
                      className={`w-full`}
                      variant={plan.highlighted ? "primary" : "secondary"}
                    >
                      {plan.buttonText}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        redirectPath="/pricing"
      />
    </MainLayout>
  );
};

export default PricingPage;