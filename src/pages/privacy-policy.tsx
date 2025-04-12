import React from 'react';
import Head from 'next/head';
import MainLayout from '../components/layout/MainLayout';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <MainLayout>
      <Head>
        <title>Privacy Policy - Hearthly</title>
        <meta name="description" content="Hearthly's privacy policy explains how we collect, use, and protect your personal information." />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg">
            Last Updated: April 12, 2025
          </p>
          
          <h2>1. Introduction</h2>
          <p>
            At Hearthly ("we," "us," or "our"), we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
          </p>
          
          <h2>2. Information We Collect</h2>
          <p>
            We may collect information about you in various ways, including:
          </p>
          <ul>
            <li><strong>Personal Information:</strong> Email address, name, and account credentials when you register.</li>
            <li><strong>Session Content:</strong> Text and voice data from your therapy sessions.</li>
            <li><strong>Usage Data:</strong> Information about how you access and use our service.</li>
            <li><strong>Device Information:</strong> Information about your device and internet connection.</li>
          </ul>
          
          <h2>3. How We Use Your Information</h2>
          <p>We may use the information we collect for various purposes, including:</p>
          <ul>
            <li>Providing and improving our services</li>
            <li>Personalizing your experience</li>
            <li>Processing transactions</li>
            <li>Communicating with you</li>
            <li>Analyzing usage patterns</li>
            <li>Protecting our services and users</li>
          </ul>
          
          <h2>4. Data Storage and Security</h2>
          <p>
            Your conversations and personal data are encrypted and stored securely. We implement appropriate technical and organizational measures to protect your information against unauthorized access or disclosure.
          </p>
          
          <h2>5. Data Sharing and Disclosure</h2>
          <p>We do not sell your personal information. We may share your information in the following situations:</p>
          <ul>
            <li>With service providers who help us operate our platform</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights, privacy, safety, or property</li>
            <li>In connection with a business transfer or transaction</li>
          </ul>
          
          <h2>6. Your Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal information, including:
          </p>
          <ul>
            <li>Accessing and updating your information</li>
            <li>Requesting deletion of your data</li>
            <li>Opting out of certain data uses</li>
            <li>Data portability</li>
          </ul>
          
          <h2>7. Children's Privacy</h2>
          <p>
            Our service is not intended for individuals under the age of 18. We do not knowingly collect personal information from children.
          </p>
          
          <h2>8. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
          
          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@hearthly.com.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default PrivacyPolicyPage;