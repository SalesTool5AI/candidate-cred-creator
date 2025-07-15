import React from 'react';
import { SalesPerformanceDashboard } from '@/components/SalesPerformanceDashboard';
import { Experience } from '@/components/Experience';

const WhatIBring = () => {
  return (
    <section id="what-i-bring" className="bg-black">
      <div className="text-center py-20">
        <h2 className="text-4xl font-bold text-white mb-4">
          What I Bring
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mb-8"></div>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto px-4">
          Track record of closing enterprise deals, building strategic relationships, and delivering consistent results
        </p>
      </div>
      
      <SalesPerformanceDashboard />
      <Experience />
    </section>
  );
};

export default WhatIBring;