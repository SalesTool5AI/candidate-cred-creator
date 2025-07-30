import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Target, TrendingUp, Lightbulb, Heart, Users } from 'lucide-react';
import Navigation from '@/components/Navigation';

const MySalesPhilosophy = () => {
  const coreValues = [
    {
      title: "Integrity First",
      description: "I believe in doing the right thing, always. Honesty, empathy, and trust are non-negotiables.",
      icon: Shield
    },
    {
      title: "Strive for Excellence", 
      description: "I hold myself to high standards and take pride in delivering results, constantly learning and refining my approach.",
      icon: Target
    },
    {
      title: "Freedom Through Impact",
      description: "I am intentional with my time and energy to create both financial and time freedom, designing a life for my family filled with opportunity and experience.",
      icon: TrendingUp
    },
    {
      title: "Growth-Minded",
      description: "I am naturally curious about people, business, psychology, and performance, always seeking insights that help me grow.",
      icon: Lightbulb
    },
    {
      title: "Create Real Value",
      description: "I always aim to leave things better than I found them, whether mentoring others, solving tough customer problems, or building a territory from scratch.",
      icon: Heart
    },
    {
      title: "Relationships Over Transactions",
      description: "Long-term partnerships matter more than short-term wins. I invest in understanding people and building trust.",
      icon: Users
    }
  ];

  const philosophyTenets = [
    "Understand deeply, solve meaningfully, and execute consistently",
    "Lead with empathy, listen first, and focus on helping my champions succeed internally",
    "The best sales process mirrors the buying journey, aligning to customer strategy, not just my sales stages",
    "Enterprise sales is about enabling — removing friction, reducing internal risk, and making success with clear outcomes feel achievable for the customer"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Navigation />
      
      <section className="pt-20 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Headline and Introduction */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">
              Sales as a Craft, Not a Transaction
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
              Enterprise sales isn't about persuading someone to buy; it's about understanding their goals and helping them move through complexity with confidence. I treat sales as a profession, a craft that blends insight, preparation, and trust-building. I don't just run a sales process; I support a buying process. My goal is to be useful, not just persistent, and to be the kind of person customers want to hear from because I add value, not pressure.
            </p>
          </div>

          {/* Core Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">My Core Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreValues.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <Icon className="h-8 w-8 text-cyan-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                          <p className="text-gray-300 text-sm leading-relaxed">{value.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Sales Philosophy */}
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardContent className="p-8 lg:p-12">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">My Sales Philosophy</h2>
              <div className="space-y-4">
                {philosophyTenets.map((tenet, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-cyan-400 mt-3"></div>
                    <p className="text-gray-300 leading-relaxed text-lg">{tenet}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default MySalesPhilosophy;