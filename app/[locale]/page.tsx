import { Hero } from '@/components/Hero';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';
import KeyStrenghts from '@/components/KeyStrenghts';

export default function Home() {
  return (
    <>
      {/* <PortfolioHero /> */}
      <Hero />
      {/* <HeroSection /> */}
      <KeyStrenghts/>
      <Projects />
      <Footer />
    </>
  );
}
