import React from 'react';
import Navigation from '@/components/Navigation';
import { SalesPerformanceDashboard } from '@/components/SalesPerformanceDashboard';

const SalesPerformancePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Navigation />
      
      <section className="pt-20">
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold text-white mb-4">
            Sales Performance Dashboard
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto px-4">
            A comprehensive view of my sales achievements, performance metrics, and key wins across enterprise accounts
          </p>
        </div>
        
        <SalesPerformanceDashboard />
      </section>
    </div>
  );
};

export default SalesPerformancePage;