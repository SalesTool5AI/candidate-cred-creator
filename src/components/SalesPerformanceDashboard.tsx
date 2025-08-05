
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Banknote, Target, TrendingUp, Calendar, Award } from "lucide-react";

const keyMetrics = [
  { icon: Banknote, label: "Total Career Bookings (ARR)", value: "$50M+", description: "Enterprise deals closed" },
  { icon: Target, label: "Average Quota Achievement", value: "125%+", description: "Consistent over-performance" },
  { icon: TrendingUp, label: "Peak Performance", value: "394%", description: "Best quarterly result" },
  { icon: Calendar, label: "Enterprise Experience", value: "10+ Years", description: "Complex deal expertise" },
];

const achievements = [
  { title: "Deal Size Range", value: "$1.5M - $5M ARR", color: "border-l-primary" },
  { title: "Territory Growth", value: "£0 → £2M GP", color: "border-l-brand-green" },
  { title: "Top 5 sales at SoftwareONE", value: "Worldwide Recognition", color: "border-l-brand-blue" },
  { title: "Salesperson of the Quarter", value: "VMware Q2 2022", color: "border-l-accent" },
];


export function SalesPerformanceDashboard() {

  return (
    <section id="sales-performance" className="py-12 sm:py-20 bg-gradient-to-b from-secondary to-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-px h-16 bg-gradient-to-b from-primary/20 to-transparent transform -rotate-45"></div>
        <div className="absolute bottom-10 left-20 w-px h-20 bg-gradient-to-b from-primary/15 to-transparent transform rotate-30"></div>
        <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-primary/60 rounded-full animate-pulse delay-500"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Sales Performance Dashboard
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Enterprise sales leader with proven track record of exceeding targets and closing complex, high-value deals with Fortune 500 companies
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {keyMetrics.map((metric, index) => (
            <Card 
              key={index} 
              className="hover:shadow-xl transition-all duration-300 hover:scale-105 bg-card/50 border-border/50 backdrop-blur-sm"
            >
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="mb-3 sm:mb-4">
                  <metric.icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary mx-auto mb-2" />
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
                    {metric.value}
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                  {metric.label}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {metric.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Key Achievements Section */}
        <div className="mb-12 sm:mb-16">
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-primary flex items-center justify-center gap-3">
                <Award className="w-6 h-6" />
                Key Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className={`border-l-4 ${achievement.color} pl-4 py-3 bg-secondary/30 rounded-r-lg`}
                >
                  <h4 className="text-lg font-semibold text-foreground mb-1">
                    {achievement.title}
                  </h4>
                  <p className="text-xl font-bold text-primary">
                    {achievement.value}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

      </div>
    </section>
  );
}
