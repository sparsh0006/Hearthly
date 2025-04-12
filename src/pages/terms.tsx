import React from 'react';
import Head from 'next/head';
import MainLayout from '../components/layout/MainLayout';

const TermsPage: React.FC = () => {
  return (
    <MainLayout>
      <Head>
        <title>Terms of Service - Hearthly</title>
        <meta name="description" content="Hearthly's terms of service outline the rules and guidelines for using our platform." />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg">
            Last Updated: April 12, 2025
          </p>
          
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or using Hearthly's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this service.
          </p>
          
          <h2>2. Use of Services</h2>
          <p>
            Hearthly provides an AI-powered platform for emotional support and conversation. Our services are intended to provide general support and are not a substitute for professional mental health treatment.
          </p>
          <p>
            You agree to use our services only for lawful purposes and in accordance with these Terms. You may not use our services:
          </p>
          <ul>
            <li>In any way that violates applicable laws or regulations</li>
            <li>To harm, threaten, or harass any person</li>
            <li>To impersonate or misrepresent your identity</li>
            <li>To engage in any conduct that restricts or inhibits anyone's use of the service</li>
            <li>To attempt to gain unauthorized access to our systems</li>
          </ul>
          
          <h2>3. Account Registration</h2>
          <p>
            To access certain features of our service, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
          </p>
          
          <h2>4. Subscription and Payments</h2>
          <p>
            We offer both free and paid subscription plans. By subscribing to a paid plan, you agree to pay all fees associated with your chosen subscription.
          </p>
          <p>
            We reserve the right to change our prices with reasonable notice. Continued use of the service after a price change constitutes your acceptance of the new price.
          </p>
          
          <h2>5. Service Limitations</h2>
          <p>
            Hearthly is not a crisis intervention service. If you are experiencing a mental health emergency, please contact a crisis hotline or emergency services immediately.
          </p>
          <p>
            Our AI technology has limitations and may not always provide perfect or appropriate responses. We continually work to improve our service but cannot guarantee specific outcomes from using our platform.
          </p>
          
          <h2>6. Intellectual Property</h2>
          <p>
            All content, features, and functionality of our service are owned by Hearthly and protected by copyright, trademark, and other intellectual property laws.
          </p>
          
          <h2>7. Disclaimer of Warranties</h2>
          <p>
            Our services are provided "as is" and "as available" without any warranties of any kind, either express or implied.
          </p>
          
          <h2>8. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Hearthly shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
          </p>
          
          <h2>9. Termination</h2>
          <p>
            We may terminate or suspend your account and access to our services immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
          </p>
          
          <h2>10. Changes to Terms</h2>
          <p>
            We may revise these Terms at any time by updating this page. Your continued use of our services after any changes constitute your acceptance of the new Terms.
          </p>
          
          <h2>11. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at terms@hearthly.com.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default TermsPage;