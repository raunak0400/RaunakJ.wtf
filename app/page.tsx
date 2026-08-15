import { Hero } from "@/components/sections/Hero/Hero";
import { WhoIAm } from "@/components/sections/WhoIAm/WhoIAm";
import { Timeline } from "@/components/sections/Timeline/Timeline";
import { TechStack } from "@/components/sections/TechStack/TechStack";
import { Projects } from "@/components/sections/Projects/Projects";
import { OpenSource } from "@/components/sections/OpenSource/OpenSource";
import { Terminal } from "@/components/sections/Terminal/Terminal";
import { Contact } from "@/components/sections/Contact/Contact";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <WhoIAm />
      <Timeline />
      <TechStack />
      <Projects />
      <OpenSource />
      <Terminal />
      <Contact />
      <Footer />
    </main>
  );
}
