
import { Button } from "@/components/ui/button";
import { ArrowDown, Mail, Phone } from "lucide-react";

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
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Sales Excellence
          </h1>
          <h2 className="text-2xl md:text-3xl font-light mb-8 text-blue-100">
            Enterprise Software Sales Professional
          </h2>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed text-blue-50">
            Driving revenue growth through strategic partnerships and innovative solutions. 
            <span className="font-semibold text-white"> Proven track record</span> of exceeding targets and building lasting client relationships.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
              onClick={() => scrollToSection('achievements')}
            >
              View Achievements
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
              onClick={() => scrollToSection('contact')}
            >
              <Mail className="mr-2 h-5 w-5" />
              Get In Touch
            </Button>
          </div>
          
          <div className="flex justify-center space-x-8 text-blue-200">
            <div className="flex items-center">
              <Mail className="mr-2 h-5 w-5" />
              <span>sales.pro@email.com</span>
            </div>
            <div className="flex items-center">
              <Phone className="mr-2 h-5 w-5" />
              <span>+1 (555) 123-4567</span>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown 
            className="h-8 w-8 text-blue-200 cursor-pointer hover:text-white transition-colors" 
            onClick={() => scrollToSection('achievements')}
          />
        </div>
      </div>
    </section>
  );
}
