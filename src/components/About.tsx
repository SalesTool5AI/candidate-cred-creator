
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

export function About() {
  return (
    <section className="py-12 sm:py-20 bg-gradient-to-b from-gray-900 to-slate-900 relative overflow-hidden">
      {/* Background network elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-px h-20 bg-gradient-to-b from-cyan-400/20 to-transparent transform -rotate-45"></div>
        <div className="absolute bottom-1/3 right-1/4 w-px h-16 bg-gradient-to-b from-blue-400/15 to-transparent transform rotate-30"></div>
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-cyan-400/60 rounded-full animate-pulse delay-600"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            About Me
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            The person behind the numbers - my story, values, and what drives my passion for sales excellence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
            <Card className="border-none shadow-xl bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
              <CardContent className="p-6 sm:p-8">
                <Quote className="h-8 w-8 sm:h-12 sm:w-12 text-cyan-400 mb-4 sm:mb-6" />
                <blockquote className="text-base sm:text-lg text-gray-200 leading-relaxed mb-4 sm:mb-6">
                  "Enterprise sales leadership with an entrepreneurial mindset - I thrive in high-stakes 
                  environments where complex deals require strategic thinking and relationship building. 
                  My goal is to leave every team, customer, and process better than I found it."
                </blockquote>
                <div className="border-t border-gray-600 pt-4 sm:pt-6">
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
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
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-700/50">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">🎯 My Philosophy</h3>
              <p className="text-sm sm:text-base text-gray-300">
                I aim to leave every team, customer, and process better than I found it. Success in 
                enterprise sales comes from building genuine partnerships and delivering measurable value.
              </p>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-700/50">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">🚀 What I Bring</h3>
              <p className="text-sm sm:text-base text-gray-300">
                Entrepreneurial mindset combined with enterprise sales expertise. I excel at translating 
                technical solutions into business value and leverage AI tools to scale my effectiveness 
                in high-stakes environments.
              </p>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-700/50">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">💡 Beyond Sales</h3>
              <p className="text-sm sm:text-base text-gray-300">
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
