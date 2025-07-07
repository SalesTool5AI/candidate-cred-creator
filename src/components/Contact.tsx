
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
    <section id="contact" className="py-12 sm:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Let's Connect
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Ready to discuss how I can drive revenue growth for your organization? 
            Let's start the conversation.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer" onClick={handleEmailClick}>
              <CardHeader className="text-center pb-4">
                <Mail className="h-8 w-8 sm:h-12 sm:w-12 text-blue-500 mx-auto mb-3 sm:mb-4" />
                <CardTitle className="text-lg sm:text-xl">Email Me</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                  Drop me a line to discuss opportunities or schedule a conversation.
                </p>
                <p className="font-semibold text-blue-600 text-sm sm:text-base">sam@sbryant.io</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer" onClick={handlePhoneClick}>
              <CardHeader className="text-center pb-4">
                <Phone className="h-8 w-8 sm:h-12 sm:w-12 text-green-500 mx-auto mb-3 sm:mb-4" />
                <CardTitle className="text-lg sm:text-xl">Call Me</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                  Prefer to talk? Give me a call to discuss your sales needs.
                </p>
                <p className="font-semibold text-green-600 text-sm sm:text-base">07444473958</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer" onClick={handleLinkedInClick}>
              <CardHeader className="text-center pb-4">
                <User className="h-8 w-8 sm:h-12 sm:w-12 text-blue-700 mx-auto mb-3 sm:mb-4" />
                <CardTitle className="text-lg sm:text-xl">LinkedIn</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                  Connect with me professionally and see my latest updates.
                </p>
                <p className="font-semibold text-blue-700 text-sm sm:text-base">View Profile</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer" onClick={handleScheduleClick}>
              <CardHeader className="text-center pb-4">
                <Calendar className="h-8 w-8 sm:h-12 sm:w-12 text-purple-500 mx-auto mb-3 sm:mb-4" />
                <CardTitle className="text-lg sm:text-xl">Schedule Meeting</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                  Book a time that works for both of us to discuss opportunities.
                </p>
                <p className="font-semibold text-purple-600 text-sm sm:text-base">Book Now</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-8 sm:mt-12">
            <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-none">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Ready to Drive Results Together?</h3>
                <p className="text-base sm:text-lg mb-4 sm:mb-6 text-blue-100">
                  I'm always open to discussing new opportunities where I can make a significant impact.
                </p>
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg transition-all duration-300 hover:scale-105"
                  onClick={handleEmailClick}
                >
                  <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Start the Conversation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
