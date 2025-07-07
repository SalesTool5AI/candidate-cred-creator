import { Button } from "@/components/ui/button";
import { ArrowDown, Mail, Phone, Trophy } from "lucide-react";

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
        <div className="animate-fade-in">
          {/* Profile Picture */}
          <div className="mb-6 sm:mb-8 flex justify-center">
            <img 
              src="/lovable-uploads/d5d74f7d-4a40-4978-96a9-c110d15a553e.png" 
              alt="Sam Bryant" 
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-2xl object-cover"
            />
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Sam Bryant
          </h1>
          <h2 className="text-lg sm:text-2xl md:text-3xl font-light mb-6 sm:mb-8 text-blue-100 px-2">
            Enterprise Account Executive
          </h2>
          <p className="text-base sm:text-xl md:text-2xl mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed text-blue-50 px-4">
            Enterprise sales leader with an entrepreneurial mindset, trusted by global brands to navigate
            complex deals and deliver results. I thrive in high-stakes environments, leverage AI to scale
            my output, and aim to leave every team, customer, and process better than I found it.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 px-4">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg transition-all duration-300 hover:scale-105"
              onClick={() => scrollToSection('achievements')}
            >
              <Trophy className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              View Achievements
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-blue-600 bg-white hover:bg-blue-50 font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg transition-all duration-300 hover:scale-105"
              onClick={() => scrollToSection('contact')}
            >
              <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Get In Touch
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-blue-200 text-sm sm:text-base px-4">
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
        
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown 
            className="h-6 w-6 sm:h-8 sm:w-8 text-blue-200 cursor-pointer hover:text-white transition-colors" 
            onClick={() => scrollToSection('achievements')}
          />
        </div>
      </div>
    </section>
  );
}
