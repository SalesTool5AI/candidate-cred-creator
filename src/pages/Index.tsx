
import { Hero } from "@/components/Hero";
import { Contact } from "@/components/Contact";
import Navigation from "@/components/Navigation";
import HowISell from "@/components/HowISell";
import WhatIBring from "@/components/WhatIBring";
import MoreThanSeller from "@/components/MoreThanSeller";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Navigation />
      
      <div id="hero">
        <Hero />
      </div>
      
      <HowISell />
      <WhatIBring />
      <MoreThanSeller />
      <Contact />
    </div>
  );
};

export default Index;
