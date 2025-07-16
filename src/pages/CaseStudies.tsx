import React from 'react';
import Navigation from '@/components/Navigation';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Target, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const CaseStudiesPage = () => {
  const caseStudies = [
    {
      slug: 'mastercard',
      title: 'Mastercard',
      subtitle: 'From Crisis to Champion',
      value: '$1.8M ARR',
      duration: '4 months',
      description: 'Transformed a security crisis into Mastercard\'s largest enterprise deal, beating established competitors through strategic problem-solving.',
      highlights: ['Beat Cisco incumbent', 'Crisis-to-opportunity conversion', 'Champion development'],
      icon: Building2,
    },
    {
      slug: 'fedex',
      title: 'FedEx International',
      subtitle: 'Strategic Partnership Through Value Creation',
      value: '£1.6M ARR',
      duration: '4 months',
      description: 'Transformed a procurement relationship into strategic partnership by aligning with business priorities.',
      highlights: ['3-month sales cycle acceleration', 'Strategic value alignment', 'International expansion'],
      icon: Target,
    },
    {
      slug: 'johnson-matthey',
      title: 'Johnson Matthey',
      subtitle: 'From Cold Prospect to Million-Pound Partnership',
      value: '£1.2M+ ARR',
      duration: '8 months',
      description: 'Built trust and demonstrated value through on-site partnership and concrete savings evidence.',
      highlights: ['On-site integration', 'Value-driven selling', 'Long-term partnership'],
      icon: Users,
    },
    {
      slug: 'fidelity',
      title: 'Fidelity International',
      subtitle: 'From At-Risk to $15M Partnership',
      value: '$5m ARR',
      duration: '12+ months',
      description: 'Rescued an at-risk client relationship and transformed it into a $15M strategic partnership through innovative solution design.',
      highlights: ['150%+ price increase accepted', '$500K professional services investment', 'Vendor to trusted partner'],
      icon: Building2,
    },
    {
      slug: 'arm',
      title: 'ARM Limited',
      subtitle: 'From Cold Call to Strategic Partner',
      value: '£1M+ annual GP',
      duration: '3 years',
      description: 'Transformed a cold call into ARM\'s largest technology partnership, securing preferred vendor status and exclusive access.',
      highlights: ['Office access 2 days/week', 'SW1 strategic account', 'Six-figure savings'],
      icon: Target,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Navigation />
      
      <section className="pt-20">
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold text-white mb-4">
            Enterprise Case Studies
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Deep dives into complex enterprise deals - the strategies, challenges, and outcomes that define my approach to strategic selling
          </p>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => {
              const IconComponent = study.icon;
              return (
                <Link key={index} to={`/case-study/${study.slug}`}>
                  <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gray-800/50 backdrop-blur-sm border-gray-700/50 hover:border-cyan-500/50 h-full">
                    <CardContent className="p-6 h-full flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <IconComponent className="h-8 w-8 text-cyan-400" />
                        <div className="text-right">
                          <div className="text-cyan-400 font-bold text-lg">{study.value}</div>
                          <div className="text-gray-400 text-sm">{study.duration}</div>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-2">{study.title}</h3>
                      <p className="text-cyan-300 text-sm font-medium mb-3">{study.subtitle}</p>
                      <p className="text-gray-300 text-sm mb-4 flex-grow">{study.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        {study.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-center text-xs text-gray-400">
                            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2"></div>
                            {highlight}
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center text-cyan-400 text-sm font-medium group-hover:text-white transition-colors duration-300 mt-auto">
                        Read Full Case Study
                        <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudiesPage;