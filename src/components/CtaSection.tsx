
import React from 'react';
import RevealOnScroll from './RevealOnScroll';

const CtaSection = () => {
  return (
    <section className="bg-noor-olive text-white">
      <div className="section-container py-16">
        <RevealOnScroll>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Experience the Natural Difference</h2>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
              Transform your hair with Noor Naturals Hair Essence Oil and give your hair the care it deserves.
            </p>
            <button className="bg-white text-noor-olive hover:bg-noor-yellow hover:text-noor-brown px-8 py-3 rounded-md transition-colors hover-scale text-lg font-medium">
              Shop Now
            </button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default CtaSection;
