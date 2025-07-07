
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

export function About() {
  return (
    <section className="py-12 sm:py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            About Me
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            The person behind the numbers - my story, values, and what drives my passion for sales excellence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
            <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 sm:p-8">
                <Quote className="h-8 w-8 sm:h-12 sm:w-12 text-blue-500 mb-4 sm:mb-6" />
                <blockquote className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6">
                  "Enterprise sales leadership with an entrepreneurial mindset - I thrive in high-stakes 
                  environments where complex deals require strategic thinking and relationship building. 
                  My goal is to leave every team, customer, and process better than I found it."
                </blockquote>
                <div className="border-t pt-4 sm:pt-6">
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    With over 10 years in enterprise software sales, I've learned that success comes from 
                    understanding client challenges deeply and leveraging AI tools to scale my output. 
                    I'm trusted by global brands to navigate complex deals and consistently deliver results 
                    that exceed expectations.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">🎯 My Philosophy</h3>
              <p className="text-sm sm:text-base text-gray-600">
                I aim to leave every team, customer, and process better than I found it. Success in 
                enterprise sales comes from building genuine partnerships and delivering measurable value.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">🚀 What I Bring</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Entrepreneurial mindset combined with enterprise sales expertise. I excel at translating 
                technical solutions into business value and leverage AI tools to scale my effectiveness 
                in high-stakes environments.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">💡 Beyond Sales</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Former academy footballer turned sales leader. I believe in continuous learning, 
                strategic thinking, and the power of technology to transform how we work. 
                Always ready for the next challenge.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
