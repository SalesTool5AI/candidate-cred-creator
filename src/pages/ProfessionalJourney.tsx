import React from 'react';
import Navigation from '@/components/Navigation';
import { Experience } from '@/components/Experience';

const ProfessionalJourneyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Navigation />
      
      <section className="pt-20">
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold text-white mb-4">
            Professional Journey
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto px-4">
            My career progression through enterprise software sales - from building £2M+ portfolios to closing seven-figure deals with global brands
          </p>
        </div>
        
        <Experience />
      </section>
    </div>
  );
};

export default ProfessionalJourneyPage;