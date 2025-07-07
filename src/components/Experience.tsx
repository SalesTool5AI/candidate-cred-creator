
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const experiences = [
  {
    company: "Tyk Technologies Limited",
    position: "Enterprise Account Executive (EMEA)",
    period: "2025 - Present",
    achievements: [
      "Covering new business and expansion for TYK across EMEA working with prospects above 10,000 users",
      "Successfully created opportunities in Vinci Holdings, Barclays, Centrica, BNP Paribas, Sanlam, GSK",
      "Closed two £240k deals in Barclays with another on the way for Vinci",
      "Submitted proposal for the biggest bid Tyk have ever made (£4m ARR) with Barclays"
    ],
    technologies: ["Salesforce", "HubSpot", "LinkedIn Sales Navigator", "Apollo.io"]
  },
  {
    company: "VMware by Broadcom",
    position: "Strategic Account Director",
    period: "Oct 2023 - Feb 2025",
    achievements: [
      "Closed $21M, achieved 394% of quota, selected for High Achievers programme",
      "Managed strategic accounts: AstraZeneca, Fidelity International and WPP",
      "Bookings over $7m for the year putting me on 108% of Quota",
      "Part of global acquisition process with strategic focus on UK & Ireland"
    ],
    technologies: ["Salesforce", "VMware Cloud Services", "LinkedIn Sales Navigator"]
  },
  {
    company: "VMware",
    position: "Account Executive | Global Accounts",
    period: "Sept 2021 - October 2023",
    achievements: [
      "VMware Account Executive of the Quarter (Q2 2022)",
      "Quota achievement 89-394% with bookings over $14m",
      "Managed VMware's biggest customers: FedEx, Mastercard, Santander, Ford",
      "Typical deal size $1.5m - $3m with 9-12 month sales cycles"
    ],
    technologies: ["VMware vSphere", "VMware Cloud", "Salesforce", "Business Case Development"]
  },
  {
    company: "SoftwareONE",
    position: "Global Account Manager | UK&I",
    period: "Sept 2014 - September 2021",
    achievements: [
      "Built £2M GP Portfolio from Scratch, Top 5 Globally in services Growth",
      "1 of only 4 salespeople to surpass £2m gross profit in 1 year in the UK",
      "Chosen by Global CEO for leadership programme in Amsterdam",
      "Key customer wins: Arm, Johnson Matthey, Associated British Foods, NCC Group, Sage, Zellis"
    ],
    technologies: ["Microsoft Azure", "Office 365", "Software Asset Management", "Cloud Migration"]
  }
];

export function Experience() {
  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Professional Journey
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            A track record of consistent growth and exceptional performance in enterprise sales roles.
          </p>
        </div>
        
        <div className="space-y-6 sm:space-y-8">
          {experiences.map((exp, index) => (
            <Card 
              key={index} 
              className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-l-4 border-l-blue-500"
            >
              <CardHeader className="pb-4 sm:pb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle className="text-xl sm:text-2xl text-gray-800 mb-1">
                      {exp.position}
                    </CardTitle>
                    <p className="text-lg sm:text-xl text-blue-600 font-semibold">
                      {exp.company}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-gray-600 mt-2 md:mt-0 self-start md:self-center">
                    {exp.period}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 sm:mb-6">
                  <h4 className="font-semibold text-gray-700 mb-3">Key Achievements:</h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className="flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm sm:text-base text-gray-600">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="bg-blue-100 text-blue-700 text-xs sm:text-sm">
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
