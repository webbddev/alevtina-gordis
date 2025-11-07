import HeroSection from '@/components/hero-section';
import { PortfolioHero } from '@/components/PortfolioHero';
import Projects from '@/components/Projects';

export default function Home() {
  return (
    <>
      <PortfolioHero />
      {/* <HeroSection /> */}
      <Projects />
    </>
  );
}
