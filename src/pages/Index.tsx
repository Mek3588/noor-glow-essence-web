
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

const Index = () => {
  useEffect(() => {
    // Function to handle reveal animations on scroll
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
    
    // Add parallax effect to elements with the parallax class
    const handleParallax = () => {
      const parallaxElements = document.querySelectorAll('.parallax');
      
      parallaxElements.forEach((element) => {
        const scrollPosition = window.pageYOffset;
        const speed = element.getAttribute('data-speed') || 0.5;
        
        element.style.transform = `translateY(${scrollPosition * speed}px)`;
      });
    };
    
    // Add scroll event listeners
    window.addEventListener('scroll', handleRevealElements);
    window.addEventListener('scroll', handleParallax);
    
    // Call once to check for elements in view on load
    handleRevealElements();
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleRevealElements);
      window.removeEventListener('scroll', handleParallax);
    };
  }, []);
  
  return (
    <div className="min-h-screen overflow-x-hidden">
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
    </div>
  );
};

export default Index;
