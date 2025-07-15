
import { Hero } from "@/components/Hero";
import { Contact } from "@/components/Contact";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Navigation />
      
      <Hero />
      <Contact />
    </div>
  );
};

export default Index;
