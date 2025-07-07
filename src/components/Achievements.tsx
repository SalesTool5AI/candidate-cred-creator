
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Achievement {
  number: number;
  suffix: string;
  title: string;
  description: string;
}

const achievements: Achievement[] = [
  {
    number: 394,
    suffix: "%",
    title: "Quota Achievement",
    description: "Peak quota performance at VMware - High Achievers programme"
  },
  {
    number: "£21m",
    suffix: "",
    title: "Revenue Closed",
    description: "Total sales revenue closed in strategic enterprise deals"
  },
  {
    number: "£2m",
    suffix: "",
    title: "GP Portfolio Built",
    description: "Built £2M gross profit portfolio from scratch at SoftwareONE"
  },
  {
    number: 5,
    suffix: "",
    title: "Global Top Performer",
    description: "Top 5 globally in services growth 2016-2021"
  }
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
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
    <span className="text-2xl sm:text-4xl md:text-5xl font-bold text-blue-600">
      {Math.floor(count)}{suffix}
    </span>
  );
}

export function Achievements() {
  return (
    <section id="achievements" className="py-12 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Proven Results
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Numbers that speak louder than words. Here's what I've accomplished in enterprise sales.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {achievements.map((achievement, index) => (
            <Card 
              key={index} 
              className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-blue-200"
            >
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="mb-3 sm:mb-4">
                  <AnimatedCounter target={achievement.number} suffix={achievement.suffix} />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                  {achievement.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
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
