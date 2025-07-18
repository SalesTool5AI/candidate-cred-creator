import React from 'react';
import { About } from '@/components/About';
import Navigation from '@/components/Navigation';

const MoreThanSellerPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Navigation />
      
      <section className="pt-20">
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold text-white mb-4">
            More than a Seller
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mb-8"></div>
          <div className="text-lg text-gray-300 max-w-4xl mx-auto px-4 space-y-4">
            <h3 className="text-2xl font-semibold text-white mb-6">Beyond Sales</h3>
            
            <p>
              I'm driven by more than just hitting targets—I want to build a career that balances success with meaning. Outside of work, I'm a dad and partner first, which keeps me grounded and focused on what truly matters. That sense of responsibility and empathy informs how I lead conversations, build relationships, and support customers and teammates alike.
            </p>
            
            <p>
              I believe in continuous growth—not just professionally but personally. Whether it's staying active, exploring new music, or diving into psychology and nutrition, I bring that same curiosity and energy into every part of my life. This balance helps me stay resilient and adaptable in the fast-paced world of enterprise software sales.
            </p>
            
            <p>
              Ultimately, I'm here to create lasting impact—not only in deals closed but in trust earned and value delivered over time.
            </p>
          </div>
        </div>
        
        <About />
      </section>
    </div>
  );
};

export default MoreThanSellerPage;