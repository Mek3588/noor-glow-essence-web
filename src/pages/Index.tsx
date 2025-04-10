import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import IngredientsSection from '@/components/IngredientsSection';
import HowToUseSection from '@/components/HowToUseSection';
import BenefitsSection from '@/components/BenefitsSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';
import LeafDecorations from '@/components/LeafDecorations';
import FloatingButton from '@/components/FloatingButton';
import HiddenAdminButton from '@/components/HiddenAdminButton';

const Index = () => {
  useEffect(() => {
    const handleRevealElements = () => {
      const reveals = document.querySelectorAll('.reveal');
      
      reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('active');
        }
      });
    };
    
    const handleParallax = () => {
      const parallaxElements = document.querySelectorAll('.parallax');
      
      parallaxElements.forEach((element) => {
        const scrollPosition = window.pageYOffset;
        const speed = element.getAttribute('data-speed') || '0.5';
        const speedValue = parseFloat(speed);
        
        if (element instanceof HTMLElement) {
          element.style.transform = `translateY(${scrollPosition * speedValue}px)`;
        }
      });
    };
    
    window.addEventListener('scroll', handleRevealElements);
    window.addEventListener('scroll', handleParallax);
    
    handleRevealElements();
    
    return () => {
      window.removeEventListener('scroll', handleRevealElements);
      window.removeEventListener('scroll', handleParallax);
    };
  }, []);
  
  return (
    <>
      <LeafDecorations />
      <Navbar />
      <HeroSection />
      <IngredientsSection />
      <HowToUseSection />
      <BenefitsSection />
      <WhyChooseUsSection />
      <CtaSection />
      <Footer />
      <FloatingButton />
      <HiddenAdminButton />
    </>
  );
};

export default Index;
