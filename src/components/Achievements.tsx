
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Achievement {
  value: number | string;
  suffix: string;
  title: string;
  description: string;
}

const achievements: Achievement[] = [
  {
    value: 394,
    suffix: "%",
    title: "Quota Achievement",
    description: "Peak quota performance at VMware - High Achievers programme"
  },
  {
    value: "£21m",
    suffix: "",
    title: "Revenue Closed",
    description: "Total sales revenue closed in strategic enterprise deals"
  },
  {
    value: "£2m",
    suffix: "",
    title: "GP Portfolio Built",
    description: "Built £2M gross profit portfolio from scratch at SoftwareONE"
  },
  {
    value: 5,
    suffix: "",
    title: "Global Top Performer",
    description: "Top 5 globally in services growth 2016-2021"
  }
];

function AnimatedCounter({ target, suffix }: { target: number | string; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // If target is a string, don't animate
    if (typeof target === 'string') {
      return;
    }

    const increment = target / 100;
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev >= target) {
          clearInterval(timer);
          return target;
        }
        return Math.min(prev + increment, target);
      });
    }, 20);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <span className="text-2xl sm:text-4xl md:text-5xl font-bold text-cyan-400">
      {typeof target === 'string' ? target : Math.floor(count)}{suffix}
    </span>
  );
}

export function Achievements() {
  return (
    <section id="achievements" className="py-12 sm:py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background network elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-px h-20 bg-gradient-to-b from-cyan-400/20 to-transparent transform rotate-12"></div>
        <div className="absolute bottom-20 right-20 w-px h-24 bg-gradient-to-b from-blue-400/15 to-transparent transform -rotate-12"></div>
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-cyan-400/60 rounded-full animate-pulse delay-300"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400/60 rounded-full animate-pulse delay-700"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Proven Results
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            Numbers that speak louder than words. Here's what I've accomplished in enterprise sales.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {achievements.map((achievement, index) => (
            <Card 
              key={index} 
              className="hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gray-800/50 border-gray-700/50 backdrop-blur-sm"
            >
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="mb-3 sm:mb-4">
                  <AnimatedCounter target={achievement.value} suffix={achievement.suffix} />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  {achievement.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-300">
                  {achievement.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
