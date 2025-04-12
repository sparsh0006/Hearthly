import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import Button from '../components/ui/Button';

const FeedbackPage: React.FC = () => {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, you would send the feedback to your server
    console.log('Feedback submitted:', feedback);
    setSubmitted(true);
    setFeedback('');
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Give Feedback</h1>
        
        {submitted ? (
          <div className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 p-6 rounded-lg text-center">
            <h2 className="text-xl font-medium mb-2">Thank you for your feedback!</h2>
            <p className="mb-4">We appreciate your input and will use it to improve Hearthly.</p>
            <Button onClick={() => setSubmitted(false)}>
              Submit Another Response
            </Button>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              We value your feedback! Please let us know how we can improve your Hearthly experience.
            </p>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="feedback" className="block text-sm font-medium mb-2 text-gray-700 dark:text-white">
                  Your Feedback
                </label>
                <textarea
                  id="feedback"
                  rows={6}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-calmi-orange focus:border-transparent text-black dark:text-white dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Share your thoughts, suggestions, or report any issues..."
                  required
                ></textarea>
              </div>
              
              <Button type="submit" className="w-full">
                Submit Feedback
              </Button>
            </form>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default FeedbackPage;