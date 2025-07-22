import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Navigation from '@/components/Navigation';

const SalesTechStackPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Navigation />
      
      <section className="pt-20 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-white mb-4">
              My Sales Tech Stack
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto"></div>
          </div>

          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white text-center mb-4">
                AI-Powered Sales Technology
              </CardTitle>
              <p className="text-gray-300 text-center max-w-3xl mx-auto">
                I leverage cutting-edge AI tools and technology throughout my sales process to maximize efficiency, 
                deliver deeper insights, and create more meaningful customer experiences.
              </p>
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
                    <TableCell className="text-gray-300 font-medium">Industry Research</TableCell>
                    <TableCell className="text-gray-300">Claude/NotebookLM/Perplexity</TableCell>
                    <TableCell className="text-gray-300">Knowing the customer and understanding the industry trends/news. This information is then used for prospecting in calls, meetings to be relevant.</TableCell>
                  </TableRow>
                  <TableRow className="border-gray-700">
                    <TableCell className="text-gray-300 font-medium">Account Specific Research</TableCell>
                    <TableCell className="text-gray-300">LinkedIn Sales Navigator/Claude/Sumble</TableCell>
                    <TableCell className="text-gray-300">Understanding their org chart, key people, analysing annual reports, earning calls, second order effects on persona's in terms of industry news.</TableCell>
                  </TableRow>
                  <TableRow className="border-gray-700">
                    <TableCell className="text-gray-300 font-medium">Prospecting</TableCell>
                    <TableCell className="text-gray-300">Apollo/Lusha/LinkedIn</TableCell>
                    <TableCell className="text-gray-300">Website tracking, sequencing, cold calls, automation with ICPs.</TableCell>
                  </TableRow>
                  <TableRow className="border-gray-700">
                    <TableCell className="text-gray-300 font-medium">Discovery</TableCell>
                    <TableCell className="text-gray-300">JamieAI / Flintt / Google Docs / Claude</TableCell>
                    <TableCell className="text-gray-300">Capturing the notes and transforming them into something actionable and useful for us and the prospect. Running prompts to critical think and using the inversion theory to find the areas we need to investigate and explore.</TableCell>
                  </TableRow>
                  <TableRow className="border-gray-700">
                    <TableCell className="text-gray-300 font-medium">Qualification</TableCell>
                    <TableCell className="text-gray-300">MEDDPICC Custom built GPT</TableCell>
                    <TableCell className="text-gray-300">Act's as a sense check to ensure the deal is healthy and to critique what more we could be doing.</TableCell>
                  </TableRow>
                  <TableRow className="border-gray-700">
                    <TableCell className="text-gray-300 font-medium">Proposals</TableCell>
                    <TableCell className="text-gray-300">Pitch</TableCell>
                    <TableCell className="text-gray-300">Interactive pitches that allow creativity, somewhere between a deck and a deal room.</TableCell>
                  </TableRow>
                  <TableRow className="border-gray-700">
                    <TableCell className="text-gray-300 font-medium">Staying organised and systematic</TableCell>
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

export default SalesTechStackPage;