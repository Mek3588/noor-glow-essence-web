
import React from 'react';
import { ChevronDown, Leaf } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import { Button } from './ui/button';

const HeroSection = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-yellow pt-16">
      <div className="section-container flex flex-col items-center justify-center">
        <RevealOnScroll>
          <div className="text-center mb-4 animate-fade-in">
            <h4 className="text-lg md:text-xl text-noor-olive mb-2">100% Original</h4>
          </div>
        </RevealOnScroll>
        
        <RevealOnScroll delay={200}>
          <div className="text-center mb-6 animate-fade-in-slow">
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 md:w-56 md:h-56 mb-4 relative">
                <img 
                  src="/lovable-uploads/fb067b85-75b4-422d-98d5-27ebc43210d0.png" 
                  alt="Noor Naturals Logo" 
                  className="object-contain animate-float w-full h-full"
                />
                <div className="absolute -z-10 top-0 left-0 w-full h-full flex items-center justify-center opacity-20 animate-pulse">
                  <Leaf className="text-noor-olive w-32 h-32" />
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
        
        <RevealOnScroll delay={400}>
          <div className="text-center my-8 animate-fade-in">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-noor-brown mb-4 relative overflow-hidden">
              <span className="bg-clip-text text-transparent bg-gradient-olive animate-slide-in-right inline-block">
                HAIR ESSENCE OIL
              </span>
            </h2>
            <div className="bg-noor-brown text-white px-6 py-3 inline-block rounded-lg mt-2 transform transition-transform hover:scale-105 duration-300">
              <p className="text-lg md:text-xl font-medium">FOR LONGER AND THICKER HAIR</p>
            </div>
          </div>
        </RevealOnScroll>
        
        <RevealOnScroll delay={600}>
          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <Button 
              className="bg-noor-olive hover:bg-noor-olive-light text-white px-8 py-6 rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Buy Now
            </Button>
            <Button 
              variant="outline"
              className="border-2 border-noor-olive text-noor-olive hover:bg-noor-olive hover:text-white px-8 py-6 rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Learn More
            </Button>
          </div>
        </RevealOnScroll>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
          <a href="#ingredients" className="text-noor-brown hover:text-noor-olive transition-colors p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40">
            <ChevronDown size={32} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
