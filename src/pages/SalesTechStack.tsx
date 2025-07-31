import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Users, FileText, TrendingUp } from 'lucide-react';
import Navigation from '@/components/Navigation';

const SalesTechStack = () => {
  const toolCategories = [
    {
      category: "Intelligence & Research",
      icon: Search,
      tools: [
        { name: "ChatGPT", description: "AI-powered research and content creation" },
        { name: "Claude", description: "Advanced AI reasoning and analysis" },
        { name: "LinkedIn Sales Navigator", description: "Professional prospecting and insights" },
        { name: "Sumble", description: "Technical stack intelligence" },
        { name: "Perplexity", description: "Financial research and market intelligence" }
      ]
    },
    {
      category: "Deal Collaboration", 
      icon: Users,
      tools: [
        { name: "Google Docs", description: "Collaborative document creation" },
        { name: "Microsoft Teams", description: "External channel to get closer to customers" },
        { name: "Slack", description: "External channel to get closer to customers" },
        { name: "WhatsApp", description: "Direct customer communication" }
      ]
    },
    {
      category: "Discovery & Notes",
      icon: FileText, 
      tools: [
        { name: "Jamie.AI", description: "AI-powered meeting notes and insights" },
        { name: "Executive Templates", description: "Structured discovery frameworks" },
        { name: "Business Case Templates", description: "ROI and value proposition tools" }
      ]
    },
    {
      category: "Outreach & Pipeline",
      icon: TrendingUp,
      tools: [
        { name: "Apollo.io", description: "Prospecting and outreach automation" },
        { name: "HubSpot", description: "CRM and pipeline management" },
        { name: "LinkedIn Sales Navigator", description: "Social selling and networking" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Navigation />
      
      <section className="pt-20 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Headline and Introduction */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">
              Tools of the Craft
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
              These tools allow me to operate with precision, deepen relationships, and stay proactive in managing my pipeline. But tools only support what matters most: building trust and delivering value. I use AI to help with critical thinking as opposed to automation.
            </p>
          </div>

          {/* Tool Categories */}
          <div className="grid lg:grid-cols-2 gap-8">
            {toolCategories.map((category, categoryIndex) => {
              const CategoryIcon = category.icon;
              return (
                <Card key={categoryIndex} className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3 text-2xl text-white">
                      <CategoryIcon className="h-8 w-8 text-cyan-400" />
                      <span>{category.category}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {category.tools.map((tool, toolIndex) => (
                        <div key={toolIndex} className="flex flex-col space-y-1 p-4 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors">
                          <h4 className="font-semibold text-cyan-400 text-lg">{tool.name}</h4>
                          <p className="text-gray-300 text-sm leading-relaxed">{tool.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Philosophy Statement */}
          <div className="text-center mt-16">
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm inline-block max-w-4xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">
                  Technology Enhances, Relationships Drive Results
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  While these tools amplify my capabilities, they never replace the fundamentals: 
                  understanding people, solving real problems, and building genuine trust. Technology 
                  is my force multiplier, not my substitute for authentic relationship building.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SalesTechStack;