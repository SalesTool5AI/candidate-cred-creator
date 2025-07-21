import React from 'react';
import Navigation from '@/components/Navigation';
import { SalesPerformanceDashboard } from '@/components/SalesPerformanceDashboard';

const SalesPerformancePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Navigation />
      
      <section className="pt-20">
        <SalesPerformanceDashboard />
      </section>
    </div>
  );
};

export default SalesPerformancePage;