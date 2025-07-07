
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const technicalSkills = [
  { name: "Salesforce CRM", level: 95 },
  { name: "HubSpot", level: 92 },
  { name: "LinkedIn Sales Navigator", level: 98 },
  { name: "Apollo.io", level: 90 },
  { name: "Claude & AI Tools", level: 95 },
  { name: "VMware Technologies", level: 88 }
];

const softSkills = [
  { name: "C-level Stakeholder Engagement", level: 98 },
  { name: "Enterprise SaaS Sales", level: 96 },
  { name: "Business Case & ROI Selling", level: 95 },
  { name: "Net New Logo Acquisition", level: 93 },
  { name: "Complex Deal Navigation", level: 94 },
  { name: "Technical to Business Translation", level: 92 }
];

const industries = [
  "API Management & Gateways",
  "Cloud Infrastructure & Virtualization", 
  "Software Asset Management",
  "Enterprise Security Solutions",
  "Financial Services Technology",
  "Pharmaceutical & Healthcare Tech"
];

function SkillBar({ skill }: { skill: { name: string; level: number } }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-200 text-sm sm:text-base">{skill.name}</span>
        <span className="text-xs sm:text-sm text-gray-400">{skill.level}%</span>
      </div>
      <Progress value={skill.level} className="h-2 sm:h-3" />
    </div>
  );
}

export function Skills() {
  return (
    <section className="py-12 sm:py-20 bg-gradient-to-b from-gray-900 to-slate-900 relative overflow-hidden">
      {/* Background network elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-px h-16 bg-gradient-to-b from-cyan-400/20 to-transparent transform -rotate-45"></div>
        <div className="absolute bottom-10 left-20 w-px h-20 bg-gradient-to-b from-blue-400/15 to-transparent transform rotate-30"></div>
        <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-cyan-400/60 rounded-full animate-pulse delay-500"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Skills & Expertise
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            A comprehensive toolkit for enterprise sales success, from technical platforms to essential competencies.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <Card className="hover:shadow-lg transition-shadow duration-300 bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-cyan-400">Technical Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              {technicalSkills.map((skill, index) => (
                <SkillBar key={index} skill={skill} />
              ))}
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow duration-300 bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-green-400">Core Competencies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              {softSkills.map((skill, index) => (
                <SkillBar key={index} skill={skill} />
              ))}
            </CardContent>
          </Card>
        </div>
        
        <Card className="hover:shadow-lg transition-shadow duration-300 bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-purple-400 text-center">Industry Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {industries.map((industry, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-r from-gray-700/50 to-slate-700/50 p-3 sm:p-4 rounded-lg text-center font-medium text-gray-200 hover:from-gray-600/50 hover:to-slate-600/50 transition-colors duration-300 text-sm sm:text-base border border-gray-600/30"
                >
                  {industry}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
