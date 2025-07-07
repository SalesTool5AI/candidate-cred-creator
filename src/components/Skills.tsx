
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
        <span className="font-medium text-gray-700 text-sm sm:text-base">{skill.name}</span>
        <span className="text-xs sm:text-sm text-gray-500">{skill.level}%</span>
      </div>
      <Progress value={skill.level} className="h-2 sm:h-3" />
    </div>
  );
}

export function Skills() {
  return (
    <section className="py-12 sm:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Skills & Expertise
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            A comprehensive toolkit for enterprise sales success, from technical platforms to essential competencies.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-blue-600">Technical Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              {technicalSkills.map((skill, index) => (
                <SkillBar key={index} skill={skill} />
              ))}
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-green-600">Core Competencies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              {softSkills.map((skill, index) => (
                <SkillBar key={index} skill={skill} />
              ))}
            </CardContent>
          </Card>
        </div>
        
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-purple-600 text-center">Industry Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {industries.map((industry, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-r from-purple-50 to-blue-50 p-3 sm:p-4 rounded-lg text-center font-medium text-gray-700 hover:from-purple-100 hover:to-blue-100 transition-colors duration-300 text-sm sm:text-base"
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
