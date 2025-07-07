
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, User, Calendar } from "lucide-react";

export function Contact() {
  const handleEmailClick = () => {
    window.location.href = "mailto:sales.pro@email.com?subject=Enterprise Sales Opportunity";
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:+15551234567";
  };

  const handleLinkedInClick = () => {
    window.open("https://linkedin.com/in/enterprise-sales-pro", "_blank");
  };

  const handleScheduleClick = () => {
    // This would typically link to a calendar booking system like Calendly
    window.open("https://calendly.com/sales-pro", "_blank");
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Let's Connect
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to discuss how I can drive revenue growth for your organization? 
            Let's start the conversation.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer" onClick={handleEmailClick}>
              <CardHeader className="text-center">
                <Mail className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <CardTitle className="text-xl">Email Me</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Drop me a line to discuss opportunities or schedule a conversation.
                </p>
                <p className="font-semibold text-blue-600">sales.pro@email.com</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer" onClick={handlePhoneClick}>
              <CardHeader className="text-center">
                <Phone className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <CardTitle className="text-xl">Call Me</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Prefer to talk? Give me a call to discuss your sales needs.
                </p>
                <p className="font-semibold text-green-600">+1 (555) 123-4567</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer" onClick={handleLinkedInClick}>
              <CardHeader className="text-center">
                <User className="h-12 w-12 text-blue-700 mx-auto mb-4" />
                <CardTitle className="text-xl">LinkedIn</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Connect with me professionally and see my latest updates.
                </p>
                <p className="font-semibold text-blue-700">View Profile</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer" onClick={handleScheduleClick}>
              <CardHeader className="text-center">
                <Calendar className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <CardTitle className="text-xl">Schedule Meeting</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Book a time that works for both of us to discuss opportunities.
                </p>
                <p className="font-semibold text-purple-600">Book Now</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-none">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Ready to Drive Results Together?</h3>
                <p className="text-lg mb-6 text-blue-100">
                  I'm always open to discussing new opportunities where I can make a significant impact.
                </p>
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
                  onClick={handleEmailClick}
                >
                  <Mail className="mr-2 h-5 w-5" />
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
