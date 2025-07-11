
import { Hero } from "@/components/Hero";
import { SalesPerformanceDashboard } from "@/components/SalesPerformanceDashboard";
import { Experience } from "@/components/Experience";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Fixed Chat Button */}
      <div className="fixed top-6 right-6 z-50 flex flex-col items-center">
        <Link to="/chat">
          <Button 
            className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-white"
            size="sm"
          >
            <Bot className="w-5 h-5" />
          </Button>
        </Link>
        <span className="text-white text-xs mt-2 text-center font-medium">
          Chat with AI Sam
        </span>
      </div>

      <Hero />
      <SalesPerformanceDashboard />
      <Experience />
      <About />
      <Contact />
    </div>
  );
};

export default Index;
