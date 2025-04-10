
import React from 'react';
import { Clock, Droplets, Shower, Calendar, AlertTriangle } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const Step = ({ icon, title, description, delay }: StepProps) => {
  return (
    <RevealOnScroll delay={delay}>
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 flex items-center justify-center bg-noor-yellow rounded-full mb-4 hover-scale">
          {icon}
        </div>
        <h3 className="font-semibold text-xl mb-2">{title}</h3>
        <p className="text-noor-brown">{description}</p>
      </div>
    </RevealOnScroll>
  );
};

const HowToUseSection = () => {
  const steps = [
    {
      icon: <Droplets className="text-noor-olive" size={32} />,
      title: "Apply",
      description: "Apply a small amount to your scalp and hair, focusing on the roots."
    },
    {
      icon: <Clock className="text-noor-olive" size={32} />,
      title: "Massage",
      description: "Massage gently for 2-3 minutes to stimulate blood flow."
    },
    {
      icon: <Calendar className="text-noor-olive" size={32} />,
      title: "Leave On",
      description: "Leave on for at least 30 minutes, or overnight for deeper conditioning."
    },
    {
      icon: <Shower className="text-noor-olive" size={32} />,
      title: "Wash",
      description: "Wash thoroughly with shampoo. Use 2-3 times per week for best results."
    }
  ];

  return (
    <section id="how-to-use" className="bg-gradient-yellow">
      <div className="section-container">
        <RevealOnScroll>
          <h2 className="section-title">How to Use</h2>
        </RevealOnScroll>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {steps.map((step, index) => (
            <Step
              key={step.title}
              icon={step.icon}
              title={step.title}
              description={step.description}
              delay={200 + index * 100}
            />
          ))}
        </div>
        
        <RevealOnScroll delay={600}>
          <div className="mt-12 bg-white p-6 rounded-xl flex items-start space-x-4 max-w-xl mx-auto">
            <AlertTriangle className="text-noor-brown flex-shrink-0 mt-1" size={24} />
            <p className="text-noor-brown">
              <span className="font-semibold">Patch test before use:</span> Apply a small amount to your skin and wait 24 hours to check for any adverse reactions.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default HowToUseSection;
