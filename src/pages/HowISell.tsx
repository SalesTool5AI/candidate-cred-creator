import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Navigation from '@/components/Navigation';

const HowISellPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Navigation />
      
      <section className="pt-20 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-white mb-4">
              How I Sell
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto"></div>
          </div>

          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardContent className="p-8 lg:p-12">
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-xl text-gray-300 leading-relaxed mb-6">
                  My philosophy in sales is simple: <span className="text-cyan-400 font-semibold">understand deeply, solve meaningfully, and execute consistently.</span>
                </p>
                
                <p className="text-gray-300 leading-relaxed mb-6">
                  I don't chase transactions, I build trust. That starts with listening. I invest time upfront to understand a prospect's goals, challenges, internal dynamics, and decision-making process. I believe enterprise sales isn't about pitching features, it's about aligning to strategy, removing friction, and helping customers win inside their own organisation.
                </p>
                
                <p className="text-gray-300 leading-relaxed mb-6">
                  I approach each engagement like a partnership. Whether I'm speaking to a CIO, head of platform engineering, or procurement lead, I focus on what matters to them, be it uptime, agility, ROI, or internal political capital. My goal isn't to impress with jargon. It's to land the right message, at the right time, with the right level of business and technical relevance.
                </p>
                
                <p className="text-gray-300 leading-relaxed mb-6">
                  Execution is key. I am always building pipeline, by networking with partners and customers, using LinkedIn and leveraging AI intelligence tools such as Sumble. I stay agile, test sequences, iterate messaging, and track signals. I don't wait for marketing, I create my own demand.
                </p>
                
                <p className="text-gray-300 leading-relaxed mb-6">
                  But beyond numbers, my philosophy is rooted in honesty, empathy, and long-term thinking. I aim to be the person customers want to hear from, not because I'm persistent, but because I'm useful. And I carry that same intent internally, collaborating with product, marketing, and pre-sales to build cohesive, customer-centric plays.
                </p>
                
                <p className="text-xl text-cyan-400 font-semibold text-center">
                  Sales is about trust, timing, and clarity. I bring all three.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm mt-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white text-center">
                My Sales Tech Stack
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-cyan-400 font-semibold">Sales Phase</TableHead>
                    <TableHead className="text-cyan-400 font-semibold">AI Tool</TableHead>
                    <TableHead className="text-cyan-400 font-semibold">Relevance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-gray-700">
                    <TableCell className="text-gray-300">Industry Research</TableCell>
                    <TableCell className="text-gray-300">Claude/NotebookLM/Perplexity</TableCell>
                    <TableCell className="text-gray-300">Knowing the customer and understanding the industry trends/news. This information is then used for prospecting in calls, meetings to be relevant.</TableCell>
                  </TableRow>
                  <TableRow className="border-gray-700">
                    <TableCell className="text-gray-300">Account Specific Research</TableCell>
                    <TableCell className="text-gray-300">LinkedIn Sales Navigator/Claude/Sumble</TableCell>
                    <TableCell className="text-gray-300">Understanding their org chart, key people, analysing annual reports, earning calls, second order effects on persona's in terms of industry news.</TableCell>
                  </TableRow>
                  <TableRow className="border-gray-700">
                    <TableCell className="text-gray-300">Prospecting</TableCell>
                    <TableCell className="text-gray-300">Apollo/Lusha/LinkedIn</TableCell>
                    <TableCell className="text-gray-300">Website tracking, sequencing, cold calls, automation with ICPs.</TableCell>
                  </TableRow>
                  <TableRow className="border-gray-700">
                    <TableCell className="text-gray-300">Discovery</TableCell>
                    <TableCell className="text-gray-300">JamieAI / Flintt / Google Docs / Claude</TableCell>
                    <TableCell className="text-gray-300">Capturing the notes and transforming them into something actionable and useful for us and the prospect. Running prompts to critical think and using the inversion theory to find the areas we need to investigate and explore.</TableCell>
                  </TableRow>
                  <TableRow className="border-gray-700">
                    <TableCell className="text-gray-300">Qualification</TableCell>
                    <TableCell className="text-gray-300">MEDDPICC Custom built GPT</TableCell>
                    <TableCell className="text-gray-300">Act's as a sense check to ensure the deal is healthy and to critique what more we could be doing.</TableCell>
                  </TableRow>
                  <TableRow className="border-gray-700">
                    <TableCell className="text-gray-300">Proposals</TableCell>
                    <TableCell className="text-gray-300">Pitch</TableCell>
                    <TableCell className="text-gray-300">Interactive pitches that allow creativity, somewhere between a deck and a deal room.</TableCell>
                  </TableRow>
                  <TableRow className="border-gray-700">
                    <TableCell className="text-gray-300">Staying organised and systematic</TableCell>
                    <TableCell className="text-gray-300">Hubspot/Tick Tick</TableCell>
                    <TableCell className="text-gray-300">Goals/Tasks/Calendar planning broken down into Pipeline Generation, Customer commitments with priority given to revenue generating activities via tagging.</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default HowISellPage;