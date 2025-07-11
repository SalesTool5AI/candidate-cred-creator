
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
            Ready to discuss how I can drive revenue growth for your organization? 
            Let's start the conversation.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer bg-gray-800/50 border-gray-700/50 backdrop-blur-sm" onClick={handleEmailClick}>
              <CardHeader className="text-center pb-4">
                <Mail className="h-8 w-8 sm:h-12 sm:w-12 text-cyan-400 mx-auto mb-3 sm:mb-4" />
                <CardTitle className="text-lg sm:text-xl text-white">Email Me</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4">
                  Drop me a line to discuss opportunities or schedule a conversation.
                </p>
                <p className="font-semibold text-cyan-400 text-sm sm:text-base">sam@sbryant.io</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer bg-gray-800/50 border-gray-700/50 backdrop-blur-sm" onClick={handlePhoneClick}>
              <CardHeader className="text-center pb-4">
                <Phone className="h-8 w-8 sm:h-12 sm:w-12 text-green-400 mx-auto mb-3 sm:mb-4" />
                <CardTitle className="text-lg sm:text-xl text-white">Call Me</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4">
                  Prefer to talk? Give me a call to discuss your sales needs.
                </p>
                <p className="font-semibold text-green-400 text-sm sm:text-base">07444473958</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer bg-gray-800/50 border-gray-700/50 backdrop-blur-sm" onClick={handleLinkedInClick}>
              <CardHeader className="text-center pb-4">
                <User className="h-8 w-8 sm:h-12 sm:w-12 text-blue-400 mx-auto mb-3 sm:mb-4" />
                <CardTitle className="text-lg sm:text-xl text-white">LinkedIn</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4">
                  Connect with me professionally and see my latest updates.
                </p>
                <p className="font-semibold text-blue-400 text-sm sm:text-base">View Profile</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer bg-gray-800/50 border-gray-700/50 backdrop-blur-sm" onClick={handleScheduleClick}>
              <CardHeader className="text-center pb-4">
                <Calendar className="h-8 w-8 sm:h-12 sm:w-12 text-purple-400 mx-auto mb-3 sm:mb-4" />
                <CardTitle className="text-lg sm:text-xl text-white">Schedule Meeting</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4">
                  Book a time that works for both of us to discuss opportunities.
                </p>
                <p className="font-semibold text-purple-400 text-sm sm:text-base">Book Now</p>
              </CardContent>
            </Card>
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
