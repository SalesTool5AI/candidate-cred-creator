
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, User, Calendar } from "lucide-react";

export function Contact() {
  const handleEmailClick = () => {
    window.location.href = "mailto:sam@sbryant.io?subject=Enterprise Sales Opportunity";
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:07444473958";
  };

  const handleLinkedInClick = () => {
    window.open("https://linkedin.com/in/sambryant", "_blank");
  };

  const handleScheduleClick = () => {
    // This would typically link to a calendar booking system like Calendly
    window.open("https://calendly.com/sam-bryant", "_blank");
  };

  return (
    <section id="contact" className="py-12 sm:py-20 bg-gradient-to-b from-slate-900 to-black relative overflow-hidden">
      {/* Background network elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-px h-28 bg-gradient-to-b from-cyan-400/20 to-transparent transform rotate-45"></div>
        <div className="absolute bottom-20 right-1/4 w-px h-24 bg-gradient-to-b from-blue-400/15 to-transparent transform -rotate-30"></div>
        <div className="absolute top-1/2 right-1/2 w-1 h-1 bg-cyan-400/60 rounded-full animate-pulse delay-800"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-blue-400/60 rounded-full animate-pulse delay-200"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Let's Connect
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            Get in touch to discuss enterprise sales opportunities.
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <div className="flex flex-col gap-4">
            <Button 
              size="lg" 
              className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold py-4 text-lg transition-all duration-300 hover:scale-105"
              onClick={handleEmailClick}
            >
              <Mail className="mr-3 h-5 w-5" />
              Email Me
            </Button>
            
            <Button 
              size="lg" 
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 text-lg transition-all duration-300 hover:scale-105"
              onClick={handlePhoneClick}
            >
              <Phone className="mr-3 h-5 w-5" />
              Call Me
            </Button>
            
            <Button 
              size="lg" 
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 text-lg transition-all duration-300 hover:scale-105"
              onClick={handleLinkedInClick}
            >
              <User className="mr-3 h-5 w-5" />
              LinkedIn Profile
            </Button>
          </div>
          
          <div className="text-center mt-8 sm:mt-12">
            <p className="text-lg text-gray-400">
              Built using Claude, Lovable & Supabase
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
