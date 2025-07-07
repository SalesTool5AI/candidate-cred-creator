
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

export function About() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            About Me
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The person behind the numbers - my story, values, and what drives my passion for sales excellence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <Quote className="h-12 w-12 text-blue-500 mb-6" />
                <blockquote className="text-lg text-gray-700 leading-relaxed mb-6">
                  "Success in enterprise sales isn't just about closing deals—it's about building 
                  relationships that transform businesses. I believe in consultative selling, where 
                  understanding client needs comes first, and solutions follow naturally."
                </blockquote>
                <div className="border-t pt-6">
                  <p className="text-gray-600 leading-relaxed">
                    With over 5 years in enterprise software sales, I've learned that every client 
                    has a unique story and specific challenges. My approach combines data-driven 
                    insights with genuine relationship building to create lasting partnerships that 
                    drive mutual success.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">🎯 My Philosophy</h3>
              <p className="text-gray-600">
                Every 'no' is just information. Every 'yes' is a new partnership. I focus on 
                understanding before being understood, and always aim to provide value first.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">🚀 What I Bring</h3>
              <p className="text-gray-600">
                A unique blend of analytical thinking and emotional intelligence. I excel at 
                translating complex technical solutions into business value that resonates 
                with C-level executives.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">💡 Beyond Sales</h3>
              <p className="text-gray-600">
                When I'm not closing deals, you'll find me mentoring junior sales professionals, 
                reading about emerging technologies, or planning my next adventure. I believe 
                in continuous learning and giving back to the community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
