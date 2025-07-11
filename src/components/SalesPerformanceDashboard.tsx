
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Banknote, Target, TrendingUp, Calendar, Award, Users } from "lucide-react";
import { useState } from "react";

const keyMetrics = [
  { icon: Banknote, label: "Total Career Bookings (ARR)", value: "$50M+", description: "Enterprise deals closed" },
  { icon: Target, label: "Average Quota Achievement", value: "125%+", description: "Consistent over-performance" },
  { icon: TrendingUp, label: "Peak Performance", value: "394%", description: "Best quarterly result" },
  { icon: Calendar, label: "Enterprise Experience", value: "10+ Years", description: "Complex deal expertise" },
];

const achievements = [
  { title: "Deal Size Range", value: "$1.5M - $4M ARR", color: "border-l-cyan-500" },
  { title: "Territory Growth", value: "£0 → £2M GP", color: "border-l-green-500" },
  { title: "Global Ranking", value: "Top 5 Worldwide sales at SoftwareONE", color: "border-l-blue-500" },
  { title: "Current Pipeline", value: "£4M+ ARR", color: "border-l-purple-500" },
];

const globalClients = [
  { 
    name: "FedEx", 
    emoji: "🚚",
    description: "Global logistics leader with complex multi-region deployment requirements",
    dealSize: "$2.1M ARR",
    challenge: "Modernizing legacy infrastructure across 220 countries"
  },
  { 
    name: "Mastercard", 
    emoji: "💳",
    description: "Financial services giant requiring enterprise-grade security solutions",
    dealSize: "$3.2M ARR", 
    challenge: "Implementing secure payment processing infrastructure"
  },
  { 
    name: "Arm", 
    emoji: "🔧",
    description: "Semiconductor company needing scalable development tools",
    dealSize: "$1.8M ARR",
    challenge: "Supporting global development teams with unified toolchain"
  },
  { 
    name: "Barclays", 
    emoji: "🏦",
    description: "Major banking institution with regulatory compliance needs",
    dealSize: "$4.0M ARR",
    challenge: "Meeting strict financial services compliance requirements"
  },
  { 
    name: "Johnson Matthey", 
    emoji: "⚗️",
    description: "Specialty chemicals company requiring advanced analytics",
    dealSize: "$1.5M ARR",
    challenge: "Optimizing chemical processes with data-driven insights"
  },
  { 
    name: "AstraZeneca", 
    emoji: "💊",
    description: "Pharmaceutical giant with global research operations",
    dealSize: "$2.8M ARR",
    challenge: "Accelerating drug discovery through cloud collaboration"
  },
];

export function SalesPerformanceDashboard() {
  const [selectedClient, setSelectedClient] = useState<typeof globalClients[0] | null>(null);

  return (
    <section id="sales-performance" className="py-12 sm:py-20 bg-gradient-to-b from-slate-900 to-gray-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-px h-16 bg-gradient-to-b from-cyan-400/20 to-transparent transform -rotate-45"></div>
        <div className="absolute bottom-10 left-20 w-px h-20 bg-gradient-to-b from-cyan-400/15 to-transparent transform rotate-30"></div>
        <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-cyan-400/60 rounded-full animate-pulse delay-500"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Sales Performance Dashboard
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            Enterprise sales leader with proven track record of exceeding targets and closing complex, high-value deals with Fortune 500 companies
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {keyMetrics.map((metric, index) => (
            <Card 
              key={index} 
              className="hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gray-800/50 border-gray-700/50 backdrop-blur-sm"
            >
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="mb-3 sm:mb-4">
                  <metric.icon className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400 mx-auto mb-2" />
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-400">
                    {metric.value}
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  {metric.label}
                </h3>
                <p className="text-sm sm:text-base text-gray-300">
                  {metric.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Key Achievements Section */}
        <div className="mb-12 sm:mb-16">
          <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-cyan-400 flex items-center justify-center gap-3">
                <Award className="w-6 h-6" />
                Key Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className={`border-l-4 ${achievement.color} pl-4 py-3 bg-gray-700/30 rounded-r-lg`}
                >
                  <h4 className="text-lg font-semibold text-white mb-1">
                    {achievement.title}
                  </h4>
                  <p className="text-xl font-bold text-cyan-400">
                    {achievement.value}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Global Clients Section */}
        <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-cyan-400 flex items-center justify-center gap-3">
              <Users className="w-6 h-6" />
              Global Enterprise Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
              {globalClients.map((client, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 bg-gray-700/50 hover:bg-gray-600/50 border-gray-600/50 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105"
                  onClick={() => setSelectedClient(client)}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">{client.emoji}</div>
                    <p className="text-sm font-medium text-white">{client.name}</p>
                  </div>
                </Button>
              ))}
            </div>

            {/* Client Details */}
            {selectedClient && (
              <Card className="bg-gray-700/50 border-gray-600/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-white flex items-center gap-3">
                    <span className="text-2xl">{selectedClient.emoji}</span>
                    {selectedClient.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300">{selectedClient.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-l-4 border-l-green-500 pl-4">
                      <h4 className="font-semibold text-white mb-1">Deal Size</h4>
                      <p className="text-green-400 font-bold">{selectedClient.dealSize}</p>
                    </div>
                    <div className="border-l-4 border-l-blue-500 pl-4">
                      <h4 className="font-semibold text-white mb-1">Key Challenge</h4>
                      <p className="text-gray-300 text-sm">{selectedClient.challenge}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
