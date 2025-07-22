import React from 'react';
import Navigation from '@/components/Navigation';
import { Card } from '@/components/ui/card';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Wish you all the best for the future. For what is it worth I am extremely proud of your growth in your career and definitely one of the best hires I have ever made. Will see you for a beer sometime soon.",
      author: "Chris Brown",
      title: "SoftwareONE Sales Director"
    },
    {
      quote: "How do we hire 5 more Sam's, I am really impressed with the willingness to jump straight in. I love the way he thinks and communicates.",
      author: "James Hirst",
      title: "Co Founder TYK"
    },
    {
      quote: "Sam is excellent, I really can't speak highly enough of him. Very natural, positive sales person who will grow any patch he is given. He would genuinely be one of my first hires to any sales team.",
      author: "Dave Knowles",
      title: "VMware Enterprise Sales Director"
    },
    {
      quote: "Sam Bryant worked for me throughout his time at SoftwareONE. I couldn't rate him highly enough as a salesperson and only wish I could get him to come and join my team again!",
      author: "Tracy Parish",
      title: "SoftwareONE Enterprise sales manager"
    },
    {
      quote: "I'm absolutely made up for you Sam, getting that order booked and the few coming too. You are a superb person and your work ethic is exemplary. We need to continue to help you shine.",
      author: "Peter Clitheroe",
      title: "VP Sales EMEA at Tyk"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
      <Navigation />
      
      <section className="pt-20">
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold text-white mb-4">
            Testimonials
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto px-4">
            What colleagues and leaders say about working with me
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300">
                <div className="space-y-6">
                  <div className="text-6xl text-cyan-400/30">"</div>
                  <blockquote className="text-gray-300 text-lg leading-relaxed italic -mt-8">
                    {testimonial.quote}
                  </blockquote>
                  <div className="border-t border-gray-700 pt-6">
                    <div className="font-semibold text-white text-lg">
                      {testimonial.author}
                    </div>
                    <div className="text-cyan-400 text-sm font-medium">
                      {testimonial.title}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;