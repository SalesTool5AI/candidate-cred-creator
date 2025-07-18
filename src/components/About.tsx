
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
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
            <Card className="border-none shadow-xl bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
              <CardContent className="p-6 sm:p-8">
                <Quote className="h-8 w-8 sm:h-12 sm:w-12 text-cyan-400 mb-4 sm:mb-6" />
                <div className="text-sm sm:text-base text-gray-300 leading-relaxed space-y-4">
                  <p>
                    I'm driven by more than just hitting targets, I want to build a career that balances success with meaning. Outside of work, I'm a dad and partner first, which keeps me grounded and focused on what truly matters. That sense of responsibility and empathy informs how I lead conversations, build relationships, and support customers and teammates alike.
                  </p>
                  <p>
                    I believe in continuous growth, not just professionally but personally. Whether it's staying active, exploring new music, or diving into psychology and nutrition, I bring that same curiosity and energy into every part of my life. This balance helps me stay resilient and adaptable in the fast-paced world of enterprise software sales.
                  </p>
                  <p>
                    Ultimately, I'm here to create lasting impact, not only in deals closed but in trust earned and value delivered over time.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-700/50">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">My Values</h3>
              <div className="space-y-3 text-sm sm:text-base text-gray-300">
                <div>
                  <h4 className="font-semibold text-cyan-400 mb-1">1. Integrity First</h4>
                  <p>I believe in doing the right thing, always. Whether I'm working with a customer, teammate, or partner, honesty, empathy, and trust are non-negotiables.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-cyan-400 mb-1">2. Strive for Excellence</h4>
                  <p>I hold myself to high standards and take pride in delivering results. I'm constantly learning, refining, and raising the bar, not just to win, but to lead by example. This is deep rooted from my professional sports background.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-cyan-400 mb-1">3. Freedom Through Impact</h4>
                  <p>Success for me means building both financial and time freedom. I'm intentional about how I spend my time and energy, designing a life for my family with opportunities and filled with experiences.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-cyan-400 mb-1">4. Growth-Minded</h4>
                  <p>I'm curious by nature, about people, business, psychology, and performance. I seek out tools, insights, and conversations that help me level up and stay ahead of the competition.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-cyan-400 mb-1">5. Create Real Value</h4>
                  <p>I'm here to make a difference. Whether I'm mentoring others, solving complex customer problems, or building enterprise account patches, I always leave things better than I found them.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-cyan-400 mb-1">6. Relationships Over Transactions</h4>
                  <p>Long-term partnerships matter more to me than short-term wins. I take the time to understand people, build trust, and communicate in ways that feel natural and human.</p>
                </div>
              </div>
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
