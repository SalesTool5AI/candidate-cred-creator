
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const technicalSkills = [
  { name: "Salesforce CRM", level: 95 },
  { name: "HubSpot", level: 90 },
  { name: "Microsoft Dynamics", level: 85 },
  { name: "LinkedIn Sales Navigator", level: 92 },
  { name: "Outreach.io", level: 88 },
  { name: "Data Analysis", level: 80 }
];

const softSkills = [
  { name: "Relationship Building", level: 98 },
  { name: "Negotiation", level: 95 },
  { name: "Strategic Thinking", level: 90 },
  { name: "Communication", level: 96 },
  { name: "Problem Solving", level: 93 },
  { name: "Leadership", level: 87 }
];

const industries = [
  "SaaS & Cloud Solutions",
  "Enterprise Security",
  "Business Intelligence",
  "Marketing Technology",
  "HR & Workforce Management",
  "Financial Services Technology"
];

function SkillBar({ skill }: { skill: { name: string; level: number } }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-700">{skill.name}</span>
        <span className="text-sm text-gray-500">{skill.level}%</span>
      </div>
      <Progress value={skill.level} className="h-3" />
    </div>
  );
}

export function Skills() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Skills & Expertise
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A comprehensive toolkit for enterprise sales success, from technical platforms to essential soft skills.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-600">Technical Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {technicalSkills.map((skill, index) => (
                <SkillBar key={index} skill={skill} />
              ))}
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl text-green-600">Core Competencies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {softSkills.map((skill, index) => (
                <SkillBar key={index} skill={skill} />
              ))}
            </CardContent>
          </Card>
        </div>
        
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl text-purple-600 text-center">Industry Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {industries.map((industry, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg text-center font-medium text-gray-700 hover:from-purple-100 hover:to-blue-100 transition-colors duration-300"
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
