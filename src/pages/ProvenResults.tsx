import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Clock, DollarSign } from 'lucide-react';
import Navigation from '@/components/Navigation';

const ProvenResults = () => {
  const caseStudies = [
    {
      company: "Mastercard",
      icon: TrendingUp,
      description: "Enabled internal champions at a Mastercard subsidiary to navigate a security crisis, displacing the incumbent and signing a $1.8M ARR deal in just 4 months—one-third of the typical sales cycle.",
      metrics: {
        value: "$1.8M ARR",
        timeline: "4 months",
        impact: "66% faster than typical cycle"
      }
    },
    {
      company: "FedEx", 
      icon: DollarSign,
      description: "Turned a cost-cutting mandate at FedEx into a £1.6M ARR win by building a business case that identified over £4M in potential savings, making the finance team our biggest advocate.",
      metrics: {
        value: "£1.6M ARR",
        timeline: "Business case driven",
        impact: "£4M+ savings identified"
      }
    },
    {
      company: "Fidelity International",
      icon: Clock,
      description: "Transformed an at-risk, churning account at Fidelity International into a $15M partnership by investing $500K in dedicated resources to fix their problems before asking for the renewal, successfully navigating a 150%+ price increase.",
      metrics: {
        value: "$15M partnership",
        timeline: "Account recovery",
        impact: "150%+ price increase"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Navigation />
      
      <section className="pt-20 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Headline */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">
              Proven Impact with over $50M+ in Career Bookings
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
              My approach has been put into practice to deliver tangible results with global enterprises. Here are a few examples:
            </p>
          </div>

          {/* Case Studies */}
          <div className="grid lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
            {caseStudies.map((study, index) => {
              const Icon = study.icon;
              return (
                <Card key={index} className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-3 text-2xl text-white">
                      <Icon className="h-8 w-8 text-cyan-400" />
                      <span>{study.company}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                      {study.description}
                    </p>
                    
                    {/* Metrics */}
                    <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-gray-600">
                      <div className="text-center">
                        <p className="text-cyan-400 font-semibold text-lg">{study.metrics.value}</p>
                        <p className="text-gray-400 text-sm">Deal Value</p>
                      </div>
                      <div className="text-center">
                        <p className="text-cyan-400 font-semibold text-lg">{study.metrics.timeline}</p>
                        <p className="text-gray-400 text-sm">Timeline</p>
                      </div>
                      <div className="text-center">
                        <p className="text-cyan-400 font-semibold text-lg">{study.metrics.impact}</p>
                        <p className="text-gray-400 text-sm">Key Impact</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Summary */}
          <div className="text-center mt-16">
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm inline-block">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">
                  Consistent Results Across Industries
                </h3>
                <p className="text-gray-300 leading-relaxed max-w-2xl">
                  These examples demonstrate my ability to navigate complex enterprise environments, 
                  build strategic relationships, and deliver measurable value that goes beyond the initial sale.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProvenResults;