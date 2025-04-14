
import React from 'react';
import RevealOnScroll from './RevealOnScroll';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

const CtaSection = () => {
  return (
    <section className="bg-gradient-to-r from-noor-olive/90 to-noor-olive text-white">
      <div className="section-container py-16 md:py-24">
        <RevealOnScroll>
          <div className="text-center max-w-3xl mx-auto">
            <ShoppingBag className="w-12 h-12 mx-auto mb-6 text-noor-yellow" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-black">Experience the Natural Difference</h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-black/90">
              Transform your hair with Noor Naturals Hair Essence Oil and give your hair the care it deserves.
            </p>
            <Button 
              className="bg-white text-noor-olive hover:bg-noor-yellow hover:text-noor-brown px-8 py-6 rounded-md transition-colors hover-scale text-lg font-medium"
              asChild
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default CtaSection;
