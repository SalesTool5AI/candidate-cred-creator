
import { Hero } from "@/components/Hero";
import { Achievements } from "@/components/Achievements";
import { SalesPerformanceDashboard } from "@/components/SalesPerformanceDashboard";
import { Experience } from "@/components/Experience";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { LogoutButton } from "@/components/LogoutButton";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <LogoutButton />
      
      {/* Fixed Chat Button */}
      <Link to="/chat">
        <Button 
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          size="lg"
        >
          <Bot className="w-5 h-5 mr-2" />
          Ask AI Sam
        </Button>
      </Link>

      <Hero />
      <Achievements />
      <SalesPerformanceDashboard />
      <Experience />
      <About />
      <Contact />
    </div>
  );
};

export default Index;
