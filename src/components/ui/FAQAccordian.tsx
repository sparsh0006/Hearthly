import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { isDarkMode } = useTheme();

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {items.map((item, index) => (
        <div key={index} className="border-b border-gray-200 dark:border-gray-700">
          <button
            className="flex justify-between items-center w-full py-5 px-1 text-left text-lg font-medium focus:outline-none text-gray-800 dark:text-white"
            onClick={() => toggleItem(index)}
          >
            <span>{item.question}</span>
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${
                openIndex === index ? 'transform rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
              openIndex === index ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <div className="pb-5 px-1 text-gray-600 dark:text-gray-300">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;