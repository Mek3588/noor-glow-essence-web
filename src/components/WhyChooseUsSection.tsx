
import React from 'react';
import { ShieldCheck, Check, Leaf } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

interface FeatureProps {
  text: string;
  delay: number;
}

const Feature = ({ text, delay }: FeatureProps) => {
  return (
    <RevealOnScroll delay={delay}>
      <div className="flex items-center space-x-2 mb-4">
        <div className="bg-noor-olive-light rounded-full p-1">
          <Check className="text-white" size={16} />
        </div>
        <span className="text-noor-brown">{text}</span>
      </div>
    </RevealOnScroll>
  );
};

const WhyChooseUsSection = () => {
  const features = [
    "No Parabens",
    "No Sulfates",
    "No Paraffins",
    "No Mineral Oil",
    "No DEA",
    "No Animal Testing",
    "100% Natural Ingredients",
    "Cruelty-Free"
  ];

  return (
    <section id="why-us" className="bg-gradient-yellow">
      <div className="section-container">
        <RevealOnScroll>
          <h2 className="section-title">Why Choose Us</h2>
        </RevealOnScroll>
        
        <div className="grid md:grid-cols-2 gap-12 mt-12">
          <RevealOnScroll delay={200}>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-6">
                <ShieldCheck className="text-noor-olive mr-3" size={32} />
                <h3 className="font-semibold text-2xl">Clean Formulation</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {features.map((feature, index) => (
                  <Feature 
                    key={feature} 
                    text={feature}
                    delay={300 + index * 50}
                  />
                ))}
              </div>
            </div>
          </RevealOnScroll>
          
          <RevealOnScroll delay={400}>
            <div className="flex flex-col justify-center">
              <div className="flex items-start space-x-4 mb-6">
                <Leaf className="text-noor-olive mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-semibold text-xl mb-2">Nature's Best Ingredients</h3>
                  <p className="text-noor-brown">
                    We carefully select the finest natural oils from sustainable sources to ensure maximum efficacy and minimal environmental impact.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <ShieldCheck className="text-noor-olive mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-semibold text-xl mb-2">Quality Assurance</h3>
                  <p className="text-noor-brown">
                    Each batch of our Hair Essence Oil undergoes rigorous quality testing to ensure consistency, purity, and effectiveness.
                  </p>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
