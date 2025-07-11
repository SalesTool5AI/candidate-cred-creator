
import { Button } from "@/components/ui/button";
import { ArrowDown, Mail, Phone, Trophy } from "lucide-react";

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
              src="/lovable-uploads/d5d74f7d-4a40-4978-96a9-c110d15a553e.png" 
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
              Enterprise Sales Executive | $30m+ Career Bookings
            </h2>
          </div>
          
          <p className="text-base sm:text-xl md:text-2xl mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed text-gray-300 px-4">
            Enterprise sales leader with an entrepreneurial mindset, trusted by global brands to navigate
            complex deals and deliver results. I thrive in high-stakes environments, leverage AI to scale
            my output, and aim to leave every team, customer, and process better than I found it.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 px-4">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg transition-all duration-300 hover:scale-105"
              onClick={() => scrollToSection('sales-performance')}
            >
              <Trophy className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              🏆 View Performance
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-cyan-400 text-cyan-400 bg-gray-800/50 hover:bg-cyan-400 hover:text-gray-900 font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg transition-all duration-300 hover:scale-105"
              onClick={() => scrollToSection('contact')}
            >
              <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Get In Touch
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-300 text-sm sm:text-base px-4">
            <div className="flex items-center">
              <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              <span>sam@sbryant.io</span>
            </div>
            <div className="flex items-center">
              <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              <span>07444473958</span>
            </div>
          </div>
        </div>
        
        {/* Admin Link - positioned in top right */}
        <div className="absolute top-4 right-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.href = '/admin'}
            className="text-xs bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Admin
          </Button>
        </div>
        
        {/* Simple scroll indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2">
          <ArrowDown 
            className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-400 cursor-pointer hover:text-white transition-colors animate-bounce" 
            onClick={() => scrollToSection('sales-performance')}
          />
        </div>
      </div>
    </section>
  );
}
