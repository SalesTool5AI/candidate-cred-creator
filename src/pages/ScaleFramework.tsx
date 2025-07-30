import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Navigation from '@/components/Navigation';

const ScaleFramework = () => {
  const frameworkStages = [
    {
      id: "strategic-targeting",
      title: "1. Strategic Targeting",
      details: [
        "Use LinkedIn Sales Navigator, Sumble, and AI tools to find high-fit accounts and ideal prospects.",
        "Look for companies under pressure or in transition (e.g., leadership changes, compliance risks, digital transformation).",
        "Build detailed stakeholder maps to understand power, blockers, and influence, recognizing that influence isn't always at the top.",
        "Map my approach to their internal process, not my CRM stages, to add value at every point."
      ]
    },
    {
      id: "curiosity-discovery",
      title: "2. Curiosity-Led Discovery",
      details: [
        "Lead with curiosity, not a checklist, to understand the root problem.",
        "Use tools like Jamie.AI (an AI Notetaker) to stay fully present and capture every insight.",
        "Reframe and reflect the problem back in the customer's own words."
      ]
    },
    {
      id: "aligned-co-creation",
      title: "3. Aligned Co-Creation",
      details: [
        "Use unbranded Google Docs and Slides to allow for easy copy-pasting and collaboration in the customer's desired format.",
        "Develop business cases using the customer's language, metrics, and acronyms.",
        "Include the 3 executive 'Whys': Why do anything? Why us? Why now?",
        "Create forwardable assets like email drafts, ROI calculators, and one-pagers for my champion's internal use.",
        "Co-create the executive summary live on calls, often asking, \"What would your CFO want to see here?\"",
        "Paint a clear picture of the 'future state' post-deployment with set milestones, ideally scoped with professional services."
      ]
    },
    {
      id: "leverage-ai",
      title: "4. Leverage AI for Relevance & Depth",
      details: [
        "Use AI to understand executive priorities, external pressures, and market context.",
        "Draft ROI narratives and implementation plans that reflect real-world concerns.",
        "Create relevant, personalized content to drive internal discussions.",
        "Use inversion theory to ensure there are no blind spots in the sales process management."
      ]
    },
    {
      id: "executive-alignment",
      title: "5. Executive Alignment & Close",
      details: [
        "Present clean, actionable summaries for executives that can be digested in 30 seconds.",
        "Address \"what if this fails?\" scenarios early and transparently with change management plans.",
        "Align close dates to procurement/budget cadence and architectural board meetings.",
        "Ensure final negotiation is the end of a thoughtful, transparent process, not a pressure point."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Navigation />
      
      <section className="pt-20 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Headline and Introduction */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">
              The SCALE Framework
            </h1>
            <p className="text-lg text-cyan-400 font-semibold mb-6">My Five-Stage Sales Process</p>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              This is the five-stage framework I use to navigate complex buying environments and support customers at every step of their decision-making journey.
            </p>
          </div>

          {/* Framework Accordion */}
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardContent className="p-8">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {frameworkStages.map((stage) => (
                  <AccordionItem key={stage.id} value={stage.id} className="border-gray-600">
                    <AccordionTrigger className="text-white hover:text-cyan-400 text-left text-lg font-semibold py-6">
                      {stage.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 pb-6">
                      <div className="space-y-3 pl-4">
                        {stage.details.map((detail, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-cyan-400 mt-2"></div>
                            <p className="leading-relaxed">{detail}</p>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ScaleFramework;