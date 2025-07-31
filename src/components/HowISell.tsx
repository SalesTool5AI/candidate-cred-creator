import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const HowISell = () => {
  return (
    <section id="how-i-sell" className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            How I Sell
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto"></div>
        </div>

        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
          <CardContent className="p-8 lg:p-12">
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-xl text-foreground leading-relaxed mb-6">
                My philosophy in sales is simple: <span className="text-cyan-400 font-semibold">understand deeply, solve meaningfully, and execute consistently.</span>
              </p>
              
              <p className="text-foreground leading-relaxed mb-6">
                I don't chase transactions, I build trust. That starts with listening. I invest time upfront to understand a prospect's goals, challenges, internal dynamics, and decision-making process. I believe enterprise sales isn't about pitching features, it's about aligning to strategy, removing friction, and helping customers win inside their own organisation.
              </p>
              
              <p className="text-foreground leading-relaxed mb-6">
                I approach each engagement like a partnership. Whether I'm speaking to a CIO, head of platform engineering, or procurement lead, I focus on what matters to them, be it uptime, agility, ROI, or internal political capital. My goal isn't to impress with jargon. It's to land the right message, at the right time, with the right level of business and technical relevance.
              </p>
              
              <p className="text-foreground leading-relaxed mb-6">
                Execution is key. I am always building pipeline, by networking with partners and customers, using LinkedIn and leveraging AI intelligence tools such as Sumble. I stay agile, test sequences, iterate messaging, and track signals. I don't wait for marketing, I create my own demand.
              </p>
              
              <p className="text-foreground leading-relaxed mb-6">
                But beyond numbers, my philosophy is rooted in honesty, empathy, and long-term thinking. I aim to be the person customers want to hear from, not because I'm persistent, but because I'm useful. And I carry that same intent internally, collaborating with product, marketing, and pre-sales to build cohesive, customer-centric plays.
              </p>
              
              <p className="text-xl text-cyan-400 font-semibold text-center">
                Sales is about trust, timing, and clarity. I bring all three.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default HowISell;