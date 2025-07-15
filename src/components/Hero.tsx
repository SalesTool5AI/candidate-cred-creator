
import { Button } from "@/components/ui/button";
import { ArrowDown, Bot } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Network lines */}
        <div className="absolute top-1/4 left-1/4 w-px h-32 bg-gradient-to-b from-cyan-400/30 to-transparent transform rotate-45"></div>
        <div className="absolute top-1/3 right-1/3 w-px h-24 bg-gradient-to-b from-blue-400/20 to-transparent transform -rotate-12"></div>
        <div className="absolute bottom-1/4 left-1/3 w-px h-28 bg-gradient-to-b from-cyan-300/25 to-transparent transform rotate-12"></div>
        <div className="absolute top-1/2 right-1/2 w-px h-20 bg-gradient-to-b from-blue-300/30 to-transparent transform rotate-45"></div>
        
        {/* Floating dots */}
        <div className="absolute top-1/4 left-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-cyan-300 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-blue-300 rounded-full animate-pulse delay-700"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
        <div className="animate-fade-in">
          {/* Profile Picture */}
          <div className="mb-6 sm:mb-8 flex justify-center">
            <img 
              src="/lovable-uploads/b76ddfd7-5e01-4edf-b5a4-0d1bae7fb384.png" 
              alt="Sam Bryant" 
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full border-4 border-cyan-400 shadow-2xl object-cover"
            />
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
            Sam Bryant
          </h1>
          
          {/* Headline */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-cyan-400">
              Enterprise Sales Executive | $50m+ Career Bookings
            </h2>
          </div>
          
          <p className="text-base sm:text-xl md:text-2xl mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed text-gray-300 px-4">
            Helping Enterprise Software Companies Win, Land and Expand Global Accounts
          </p>
          
          <div className="flex flex-col items-center justify-center mb-12 sm:mb-16 px-4 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-white">The Sam Bryant Assistant</h3>
              <p className="text-lg text-cyan-400 font-semibold mb-6">AI Powered</p>
            </div>
            <Link to="/chat">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl transition-all duration-300 hover:scale-105 shadow-2xl"
              >
                <Bot className="mr-3 h-6 w-6" />
                Start Chat
              </Button>
            </Link>
          </div>
        </div>
        
        
        {/* Simple scroll indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2">
          <ArrowDown 
            className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-400 cursor-pointer hover:text-white transition-colors animate-bounce" 
            onClick={() => scrollToSection('how-i-sell')}
          />
        </div>
      </div>
    </section>
  );
}
