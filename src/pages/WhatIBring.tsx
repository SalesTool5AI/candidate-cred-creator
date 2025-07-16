import React from 'react';
import { SalesPerformanceDashboard } from '@/components/SalesPerformanceDashboard';
import { Experience } from '@/components/Experience';
import Navigation from '@/components/Navigation';

const WhatIBringPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Navigation />
      
      <section className="pt-20">
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold text-white mb-4">
            What I Bring
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mb-8"></div>
          <div className="text-lg text-gray-300 max-w-4xl mx-auto px-4 space-y-4">
            <p>
              I help enterprise software vendors win and grow their most valuable accounts.
            </p>
            <p>
              With a track record of selling complex solutions to global giants like Mastercard, FedEx, Ford, and Santander, I bring deep experience in enterprise SaaS, API platforms, developer tools and Hybrid infrastructure. At VMware, SoftwareONE and now Tyk, I've built new business pipelines from scratch, navigated long sales cycles, and consistently closed seven-figure deals with C-level stakeholders.
            </p>
            <p>
              My edge? I lead with curiosity, operate with precision, and sell with purpose. I simplify the technical, align to business outcomes, and thrive in deals where multiple stakeholders, competing priorities, and ambiguity are the norm. I'm hands-on with tools like Apollo, HubSpot, and LinkedIn Sales Navigator, and obsessive about relevance, timing, and tailored outreach.
            </p>
            <p>
              I'm not just looking to hit quota. I want to be part of a winning team, one that's scaling fast, solving meaningful problems, and backing their people. I'm at my best in companies that constantly strive for higher standards and push all employees out of their comfort zone. Ideally somewhere where there's still room to shape how enterprise sales is done.
            </p>
            <p>
              If you're hiring enterprise AEs who can hunt, close, and land strategic accounts while building pipeline and brand in parallel, let's talk.
            </p>
          </div>
        </div>
        
        <SalesPerformanceDashboard />
        <Experience />
      </section>
    </div>
  );
};

export default WhatIBringPage;