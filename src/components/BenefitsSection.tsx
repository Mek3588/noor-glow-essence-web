
import React from 'react';
import { TrendingUp, Heart, Sparkles, Shield } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const BenefitCard = ({ icon, title, description, delay }: BenefitCardProps) => {
  return (
    <RevealOnScroll delay={delay}>
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 flex items-center justify-center bg-noor-yellow rounded-full mb-4">
            {icon}
          </div>
          <h3 className="font-semibold text-xl mb-3">{title}</h3>
          <p className="text-noor-brown">{description}</p>
        </div>
      </div>
    </RevealOnScroll>
  );
};

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <TrendingUp className="text-noor-olive" size={32} />,
      title: "Promotes Hair Growth",
      description: "Stimulates follicles and improves blood circulation to encourage faster, healthier hair growth."
    },
    {
      icon: <Heart className="text-noor-olive" size={32} />,
      title: "Soothes & Nourishes Hair",
      description: "Deeply conditions the hair and scalp, reducing dryness and providing essential nutrients."
    },
    {
      icon: <Sparkles className="text-noor-olive" size={32} />,
      title: "Adds Natural Shine",
      description: "Restores the natural luster of your hair, making it look healthier and more vibrant."
    },
    {
      icon: <Shield className="text-noor-olive" size={32} />,
      title: "Protects Hair Strands",
      description: "Forms a protective barrier that prevents damage from environmental factors and styling."
    }
  ];

  return (
    <section id="benefits" className="bg-white">
      <div className="section-container">
        <RevealOnScroll>
          <h2 className="section-title">Benefits</h2>
        </RevealOnScroll>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={benefit.title}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              delay={200 + index * 100}
            />
          ))}
        </div>

        <RevealOnScroll delay={600}>
          <div className="mt-12 text-center">
            <p className="text-xl text-noor-brown italic">
              "For Longer and Thicker Hair"
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default BenefitsSection;
