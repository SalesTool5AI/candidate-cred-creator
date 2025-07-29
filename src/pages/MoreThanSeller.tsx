import React from 'react';
import { About } from '@/components/About';
import Navigation from '@/components/Navigation';

const MoreThanSellerPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <Navigation />
      
      <section className="pt-20">
        <About />
      </section>
    </div>
  );
};

export default MoreThanSellerPage;