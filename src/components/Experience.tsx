
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Import company logos
import tykLogo from "@/assets/logos/tyk-white.png";
import vmwareLogo from "@/assets/logos/vmware-white.png";
import broadcomLogo from "@/assets/logos/broadcom-white.png";
import softwareOneLogo from "@/assets/logos/softwareone-white.png";

const experiences = [
  {
    company: "Tyk Technologies Limited",
    logo: tykLogo,
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
    logo: broadcomLogo,
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
    logo: vmwareLogo,
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
    logo: softwareOneLogo,
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
    <section className="py-12 sm:py-20 bg-gradient-to-b from-slate-900 to-gray-900 relative overflow-hidden">
      {/* Background network elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-px h-24 bg-gradient-to-b from-cyan-400/20 to-transparent transform rotate-45"></div>
        <div className="absolute bottom-1/4 right-10 w-px h-20 bg-gradient-to-b from-blue-400/15 to-transparent transform -rotate-30"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-cyan-400/60 rounded-full animate-pulse delay-400"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Professional Journey
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            A track record of consistent growth and exceptional performance in enterprise sales roles.
          </p>
        </div>
        
        <div className="space-y-6 sm:space-y-8">
          {experiences.map((exp, index) => (
            <Card 
              key={index} 
              className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-l-4 border-l-cyan-500 bg-gray-800/50 border-gray-700/50 backdrop-blur-sm"
            >
              <CardHeader className="pb-4 sm:pb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <img 
                      src={exp.logo} 
                      alt={`${exp.company} logo`} 
                      className="h-10 w-auto max-w-[120px] object-contain"
                    />
                    <div>
                      <CardTitle className="text-xl sm:text-2xl text-white mb-1">
                        {exp.position}
                      </CardTitle>
                      <p className="text-lg sm:text-xl text-cyan-400 font-semibold">
                        {exp.company}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-gray-300 border-gray-600 mt-2 md:mt-0 self-start md:self-center">
                    {exp.period}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 sm:mb-6">
                  <h4 className="font-semibold text-gray-200 mb-3">Key Achievements:</h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className="flex items-start">
                        <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm sm:text-base text-gray-300">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-200 mb-3">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="bg-gray-700/50 text-cyan-300 text-xs sm:text-sm border border-gray-600/30">
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
