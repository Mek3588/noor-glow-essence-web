
import React from 'react';
import { ChevronDown } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

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
              <div className="w-24 h-24 md:w-32 md:h-32 mb-4">
                <img 
                  src="/lovable-uploads/b49771c0-c998-442e-a1a9-6cabc432cb90.png" 
                  alt="Olive Branch" 
                  className="object-contain opacity-50 animate-float"
                />
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-2">NOOR</h1>
              <p className="text-xl md:text-2xl font-medium tracking-widest">NATURALS</p>
            </div>
          </div>
        </RevealOnScroll>
        
        <RevealOnScroll delay={400}>
          <div className="text-center my-8 animate-fade-in">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-noor-brown mb-4">
              HAIR ESSENCE OIL
            </h2>
            <div className="bg-noor-brown text-white px-6 py-3 inline-block rounded mt-2">
              <p className="text-lg md:text-xl font-medium">FOR LONGER AND THICKER HAIR</p>
            </div>
          </div>
        </RevealOnScroll>
        
        <RevealOnScroll delay={600}>
          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <button className="bg-noor-olive hover:bg-noor-olive-light text-white px-8 py-3 rounded-md transition-colors hover-scale">
              Buy Now
            </button>
            <button className="border-2 border-noor-olive text-noor-olive hover:bg-noor-olive hover:text-white px-8 py-3 rounded-md transition-colors hover-scale">
              Learn More
            </button>
          </div>
        </RevealOnScroll>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
          <a href="#ingredients" className="text-noor-brown hover:text-noor-olive transition-colors">
            <ChevronDown size={32} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
