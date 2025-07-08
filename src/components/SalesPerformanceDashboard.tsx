
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Target, TrendingUp, Calendar, Award, Users } from "lucide-react";

const keyMetrics = [
  { icon: DollarSign, label: "Total Career Bookings", value: "$30M+", description: "Enterprise deals closed" },
  { icon: Target, label: "Average Quota Achievement", value: "125%+", description: "Consistent over-performance" },
  { icon: TrendingUp, label: "Peak Performance", value: "394%", description: "Best quarterly result" },
  { icon: Calendar, label: "Enterprise Experience", value: "10+ Years", description: "Complex deal expertise" },
];

const achievements = [
  { title: "Deal Size Range", value: "$1.5M - $4M ARR", color: "border-green-400" },
  { title: "Territory Growth", value: "£0 → £2M GP", color: "border-blue-400" },
  { title: "Global Ranking", value: "Top 5 Worldwide", color: "border-purple-400" },
  { title: "Current Pipeline", value: "£4M+ ARR", color: "border-orange-400" },
];

const careerProgression = [
  { 
    company: "Tyk Technologies", 
    period: "2025-Present", 
    gradient: "from-green-500 to-emerald-600",
    role: "Enterprise Account Executive"
  },
  { 
    company: "VMware/Broadcom", 
    period: "2021-2025", 
    gradient: "from-blue-500 to-indigo-600",
    role: "Strategic Account Director"
  },
  { 
    company: "SoftwareONE", 
    period: "2014-2021", 
    gradient: "from-purple-500 to-violet-600",
    role: "Global Account Manager"
  },
];

const globalClients = [
  { name: "FedEx", emoji: "🚚" },
  { name: "Mastercard", emoji: "💳" },
  { name: "Ford", emoji: "🚗" },
  { name: "Barclays", emoji: "🏦" },
  { name: "Santander", emoji: "🏛️" },
  { name: "AstraZeneca", emoji: "💊" },
];

const bottomStats = [
  { value: "9-12 months", label: "Average sales cycle" },
  { value: "89-394%", label: "Quota achievement range" },
  { value: "$21M+", label: "VMware performance" },
];

export function SalesPerformanceDashboard() {
  return (
    <section className="py-12 sm:py-20 bg-gradient-to-b from-slate-900 to-gray-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-px h-16 bg-gradient-to-b from-green-400/20 to-transparent transform -rotate-45"></div>
        <div className="absolute bottom-10 left-20 w-px h-20 bg-gradient-to-b from-emerald-400/15 to-transparent transform rotate-30"></div>
        <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-green-400/60 rounded-full animate-pulse delay-500"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* 1. HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Sales Performance Dashboard
          </h2>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Enterprise sales leader with proven track record of exceeding targets and closing complex, high-value deals with Fortune 500 companies
          </p>
        </div>

        {/* 2. KEY METRICS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {keyMetrics.map((metric, index) => (
            <Card 
              key={index} 
              className="hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gray-800/50 border-gray-700/50 backdrop-blur-sm"
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <metric.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-green-400 mb-2">
                    {metric.value}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {metric.label}
                </h3>
                <p className="text-sm text-gray-300">
                  {metric.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 3. TWO-COLUMN SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Left Column - Key Achievements */}
          <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-green-400 flex items-center gap-3">
                <Award className="w-6 h-6" />
                Key Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className={`border-l-4 ${achievement.color} pl-4 py-3 bg-gray-700/30 rounded-r-lg`}
                >
                  <h4 className="text-lg font-semibold text-white mb-1">
                    {achievement.title}
                  </h4>
                  <p className="text-xl font-bold text-green-400">
                    {achievement.value}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Right Column - Career Progression */}
          <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-green-400 flex items-center gap-3">
                <TrendingUp className="w-6 h-6" />
                Career Progression
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {careerProgression.map((role, index) => (
                <div 
                  key={index} 
                  className={`bg-gradient-to-r ${role.gradient} p-4 rounded-lg text-white`}
                >
                  <h4 className="text-lg font-bold mb-1">
                    {role.company}
                  </h4>
                  <p className="text-sm opacity-90 mb-1">
                    {role.role}
                  </p>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {role.period}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* 4. GLOBAL CLIENTS SECTION */}
        <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm mb-16">
          <CardHeader>
            <CardTitle className="text-2xl text-green-400 flex items-center justify-center gap-3">
              <Users className="w-6 h-6" />
              Global Enterprise Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {globalClients.map((client, index) => (
                <Card 
                  key={index} 
                  className="bg-gray-700/50 hover:bg-gray-600/50 transition-all duration-300 hover:scale-105 border-gray-600/50"
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl mb-2">{client.emoji}</div>
                    <p className="text-sm font-medium text-white">{client.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 5. BOTTOM CTA SECTION */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-none">
          <CardContent className="p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">
              Proven Enterprise Sales Excellence
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Consistent track record of building relationships with C-level executives and closing complex, multi-million dollar deals
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {bottomStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
