import Navbar from '@/components/layout/Navbar';
import AnimatedBackground from '@/components/layout/AnimatedBackground';
import HeroSection from '@/components/landing/HeroSection';
import HowItWorks from '@/components/landing/HowItWorks';
import Features from '@/components/landing/Features';
import UGFShowcase from '@/components/landing/UGFShowcase';
import FAQAndFooter from '@/components/landing/FAQAndFooter';


export default function Home() {
  return (
    <main className="relative">
      <AnimatedBackground />
      <Navbar />
      <div className="relative z-10">
        <HeroSection />
        <HowItWorks />
        <UGFShowcase />
        <Features />
        <FAQAndFooter />
      </div>
    </main>
  );
}
