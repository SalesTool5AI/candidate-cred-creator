
import { Hero } from "@/components/Hero";
import { Achievements } from "@/components/Achievements";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Hero />
      <Achievements />
      <Skills />
      <Experience />
      <About />
      <Contact />
    </div>
  );
};

export default Index;
