import React from 'react';
import Head from 'next/head';
import MainLayout from '../components/layout/MainLayout';

const DisclaimerPage: React.FC = () => {
  return (
    <MainLayout>
      <Head>
        <title>AI Disclaimer - Hearthly</title>
        <meta name="description" content="Important information about Hearthly's AI capabilities, limitations, and intended use." />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">AI Disclaimer</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg">
            Last Updated: April 12, 2025
          </p>
          
          <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg my-6 border-l-4 border-yellow-500">
            <p className="font-medium text-yellow-800 dark:text-yellow-200">
              Hearthly is an AI-powered emotional support tool and is not a replacement for professional mental health services. Please read this disclaimer carefully.
            </p>
          </div>
          
          <h2>Nature of Service</h2>
          <p>
            Hearthly uses artificial intelligence to provide conversational support. While our AI is designed to be empathetic and responsive, it is a technological tool, not a human therapist, counselor, or healthcare provider.
          </p>
          
          <h2>Not Medical or Professional Advice</h2>
          <p>
            The information provided by Hearthly is for general informational and supportive purposes only. It is not intended to be and should not be construed as:
          </p>
          <ul>
            <li>Medical advice</li>
            <li>Mental health treatment</li>
            <li>Therapy or counseling services</li>
            <li>Diagnosis of any health condition</li>
            <li>A substitute for consulting with qualified professionals</li>
          </ul>
          
          <h2>AI Limitations</h2>
          <p>
            As an AI system, Hearthly has inherent limitations:
          </p>
          <ul>
            <li>It may not always understand the nuance or context of your situation</li>
            <li>It cannot perform clinical assessments or diagnoses</li>
            <li>It lacks the human judgment of trained professionals</li>
            <li>It may occasionally produce responses that are inaccurate or inappropriate</li>
            <li>It does not have access to your complete medical history or personal context</li>
          </ul>
          
          <h2>Emergency Situations</h2>
          <p>
            <strong>Hearthly is not an emergency service.</strong> If you are experiencing a mental health emergency, having thoughts of harming yourself or others, or require immediate assistance, please:
          </p>
          <ul>
            <li>Call emergency services (911 in the US)</li>
            <li>Contact a crisis hotline (988 Suicide & Crisis Lifeline in the US)</li>
            <li>Go to your nearest emergency room</li>
            <li>Reach out to a trusted person who can help you access appropriate care</li>
          </ul>
          
          <h2>Professional Support</h2>
          <p>
            We strongly encourage users to seek appropriate professional help for specific mental health concerns, diagnoses, or treatment. Hearthly can be a complementary tool, but should not replace professional mental health services.
          </p>
          
          <h2>Continuous Improvement</h2>
          <p>
            We are constantly working to improve our AI system, but it will always have limitations. User interactions help us understand how to better develop and refine our service, but improvements happen over time and are not immediate.
          </p>
          
          <h2>Privacy Considerations</h2>
          <p>
            While your conversations with Hearthly are private and encrypted, please be mindful of the personal information you share. Review our Privacy Policy for more information on how we handle your data.
          </p>
          
          <h2>Contact Us</h2>
          <p>
            If you have questions about this disclaimer or concerns about the service, please contact us at support@hearthly.com.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default DisclaimerPage;