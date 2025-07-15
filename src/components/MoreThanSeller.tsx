import React from 'react';
import { About } from '@/components/About';

const MoreThanSeller = () => {
  return (
    <section id="more-than-seller" className="bg-gray-900">
      <div className="text-center py-20">
        <h2 className="text-4xl font-bold text-white mb-4">
          More than a Seller
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mb-8"></div>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto px-4">
          Beyond closing deals, I bring strategic thinking, team collaboration, and a commitment to excellence
        </p>
      </div>
      
      <About />
    </section>
  );
};

export default MoreThanSeller;