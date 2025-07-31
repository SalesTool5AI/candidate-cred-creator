
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, ArrowRight } from "lucide-react";

export function About() {
  return (
    <section className="min-h-screen py-12 sm:py-20 bg-gradient-to-b from-background to-secondary relative overflow-hidden">
      {/* Background network elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-px h-20 bg-gradient-to-b from-primary/20 to-transparent transform -rotate-45"></div>
        <div className="absolute bottom-1/3 right-1/4 w-px h-16 bg-gradient-to-b from-brand-blue/15 to-transparent transform rotate-30"></div>
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-primary/60 rounded-full animate-pulse delay-600"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            About Me
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
            <Card className="border-none shadow-xl bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6 sm:p-8">
                <Quote className="h-8 w-8 sm:h-12 sm:w-12 text-primary mb-4 sm:mb-6" />
                <div className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-4">
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
            <Link to="/my-values" className="block">
              <div className="bg-card/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50 hover:border-primary/50 cursor-pointer group">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">My Values</h3>
                  <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform duration-300" />
                </div>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Discover the core principles that guide my approach to business, relationships, and life. 
                  Click to explore the 6 values that shape everything I do.
                </p>
              </div>
            </Link>
            
            <div className="bg-card/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border/50">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">🚀 What I Bring</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Entrepreneurial mindset combined with enterprise sales expertise. I excel at translating 
                technical solutions into business value and leverage AI tools to scale my effectiveness 
                in high-stakes environments.
              </p>
            </div>
            
            <div className="bg-card/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border/50">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">💡 Beyond Sales</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Former academy footballer turned sales leader. I believe in continuous learning, 
                strategic thinking, and the power of technology to transform how we work. 
                Always ready for the next challenge. My interests include, Football (For my sins I support Leeds United), golf, tennis, running, the gym & house music. I also like to invest and take an active interest in the financial markets.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
