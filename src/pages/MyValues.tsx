import React from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent } from "@/components/ui/card";

const MyValuesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Navigation />
      
      <section className="pt-20">
        <div className="container mx-auto px-4 sm:px-6 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-white mb-4">
              My Values
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mb-8"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="border-none shadow-xl bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
              <CardContent className="p-8">
                <div className="space-y-8 text-gray-300">
                  <div>
                    <h3 className="text-2xl font-semibold text-cyan-400 mb-3">1. Integrity First</h3>
                    <p className="text-lg leading-relaxed">
                      I believe in doing the right thing, always. Whether I'm working with a customer, teammate, or partner, honesty, empathy, and trust are non-negotiables.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-semibold text-cyan-400 mb-3">2. Strive for Excellence</h3>
                    <p className="text-lg leading-relaxed">
                      I hold myself to high standards and take pride in delivering results. I'm constantly learning, refining, and raising the bar, not just to win, but to lead by example. This is deep rooted from my professional sports background.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-semibold text-cyan-400 mb-3">3. Freedom Through Impact</h3>
                    <p className="text-lg leading-relaxed">
                      Success for me means building both financial and time freedom. I'm intentional about how I spend my time and energy, designing a life for my family with opportunities and filled with experiences.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-semibold text-cyan-400 mb-3">4. Growth-Minded</h3>
                    <p className="text-lg leading-relaxed">
                      I'm curious by nature, about people, business, psychology, and performance. I seek out tools, insights, and conversations that help me level up and stay ahead of the competition.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-semibold text-cyan-400 mb-3">5. Create Real Value</h3>
                    <p className="text-lg leading-relaxed">
                      I'm here to make a difference. Whether I'm mentoring others, solving complex customer problems, or building enterprise account patches, I always leave things better than I found them.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-semibold text-cyan-400 mb-3">6. Relationships Over Transactions</h3>
                    <p className="text-lg leading-relaxed">
                      Long-term partnerships matter more to me than short-term wins. I take the time to understand people, build trust, and communicate in ways that feel natural and human.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyValuesPage;