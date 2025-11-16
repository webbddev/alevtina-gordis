import { Hero } from '@/components/Hero';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';
import KeyStrengths from '@/components/KeyStrengths';

export default function Home() {
  return (
    <>
      {/* <PortfolioHero /> */}
      <Hero />
      {/* <HeroSection /> */}
      <Projects />
      <KeyStrengths/>
      <Footer />
    </>
  );
}
