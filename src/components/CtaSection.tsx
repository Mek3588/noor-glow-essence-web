
import React from 'react';
import RevealOnScroll from './RevealOnScroll';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const CtaSection = () => {
  return (
    <section className="bg-gradient-to-r from-green-800/90 to-green-700 text-white">
      <div className="section-container py-16 md:py-24">
        <RevealOnScroll>
          <div className="text-center max-w-3xl mx-auto">
            <Sparkles className="w-12 h-12 mx-auto mb-6 text-yellow-300" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Transform Your Hair Today</h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/90">
              Experience the power of nature with our Miracle Growth Hair & Scalp Oil for longer, thicker, healthier hair.
            </p>
            <Button 
              className="bg-white text-green-800 hover:bg-yellow-300 hover:text-green-900 px-8 py-6 rounded-md transition-colors hover-scale text-lg font-medium"
              asChild
            >
              <Link to="/contact">Get Yours Today</Link>
            </Button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default CtaSection;
