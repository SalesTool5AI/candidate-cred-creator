
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const experiences = [
  {
    company: "TechGlobal Solutions",
    position: "Senior Enterprise Sales Executive",
    period: "2022 - Present",
    achievements: [
      "Generated $1.2M in new business revenue within first year",
      "Closed 3 enterprise deals worth $400K+ each",
      "Built strategic partnerships with 15+ Fortune 500 companies",
      "Led cross-functional team for major client implementations"
    ],
    technologies: ["Salesforce", "HubSpot", "Outreach.io", "LinkedIn Sales Navigator"]
  },
  {
    company: "CloudTech Innovations",
    position: "Sales Development Manager",
    period: "2020 - 2022",
    achievements: [
      "Exceeded quarterly targets by 125% for 6 consecutive quarters",
      "Managed and mentored team of 5 junior sales representatives",
      "Developed new prospecting strategies increasing lead quality by 40%",
      "Achieved 92% client retention rate across managed accounts"
    ],
    technologies: ["Microsoft Dynamics", "ZoomInfo", "Slack", "Tableau"]
  },
  {
    company: "Enterprise Software Corp",
    position: "Business Development Representative",
    period: "2018 - 2020",
    achievements: [
      "Generated 200+ qualified leads per quarter",
      "Achieved 'Rookie of the Year' award in first year",
      "Maintained 95% activity completion rate",
      "Contributed to team's 180% quota achievement"
    ],
    technologies: ["Salesforce", "Apollo.io", "Calendly", "Google Workspace"]
  }
];

export function Experience() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Professional Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A track record of consistent growth and exceptional performance in enterprise sales roles.
          </p>
        </div>
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card 
              key={index} 
              className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-l-4 border-l-blue-500"
            >
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle className="text-2xl text-gray-800 mb-1">
                      {exp.position}
                    </CardTitle>
                    <p className="text-xl text-blue-600 font-semibold">
                      {exp.company}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-gray-600 mt-2 md:mt-0">
                    {exp.period}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-3">Key Achievements:</h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className="flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-600">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="bg-blue-100 text-blue-700">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
