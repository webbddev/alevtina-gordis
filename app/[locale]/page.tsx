import HeroSection from '@/components/hero-section';
import { PortfolioHero } from '@/components/PortfolioHero';
import { PortfolioHero1 } from '@/components/PortfolioHero1';
import Projects from '@/components/Projects';

export default function Home() {
  return (
    <>
      {/* <PortfolioHero /> */}
      <PortfolioHero1/>
      {/* <HeroSection /> */}
      <Projects />
    </>
  );
}
