
import React from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Shield, CircleDashed, Leaf } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import RevealOnScroll from './RevealOnScroll';

const BenefitsSection = () => {
  const { contentItems } = useAdmin();
  const benefitItems = contentItems.filter(item => item.type === 'benefit');
  
  // Fallback benefits in case there are none in the admin panel
  const defaultBenefits = [
    {
      id: 'default-1',
      title: 'Natural Ingredients',
      description: 'Our hair oil is made with 100% natural ingredients, sourced from sustainable farms.',
      icon: <Leaf className="w-10 h-10 text-noor-olive" />
    },
    {
      id: 'default-2',
      title: 'Increased Hair Growth',
      description: 'Regular use can promote hair growth and help strengthen hair follicles.',
      icon: <CircleDashed className="w-10 h-10 text-noor-olive" />
    },
    {
      id: 'default-3',
      title: 'No Harmful Chemicals',
      description: 'Free from parabens, sulfates, and other harmful chemicals that damage your hair.',
      icon: <Shield className="w-10 h-10 text-noor-olive" />
    }
  ];

  // Display admin benefits if available, otherwise show defaults
  const displayBenefits = benefitItems.length > 0 ? benefitItems : defaultBenefits;
  
  return (
    <section id="benefits" className="bg-white relative">
      <div className="section-container">
        <RevealOnScroll>
          <h2 className="section-title text-center mx-auto after:left-1/2 after:-translate-x-1/2">
            Benefits
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Discover the amazing benefits of our hair essence oil, crafted to help you achieve healthier, stronger, and more beautiful hair.
          </p>
        </RevealOnScroll>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {displayBenefits.map((benefit, index) => (
            <RevealOnScroll key={benefit.id} delay={index * 100}>
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white overflow-hidden hover:scale-105 transform transition-transform duration-300">
                <CardHeader className="pb-2">
                  <div className="mb-4">
                    {benefit.imageUrl ? (
                      <img 
                        src={benefit.imageUrl} 
                        alt={benefit.title} 
                        className="w-16 h-16 object-cover rounded-full"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.svg';
                        }}
                      />
                    ) : (
                      benefit.icon || <Leaf className="w-10 h-10 text-noor-olive" />
                    )}
                  </div>
                  <CardTitle className="text-xl font-semibold text-noor-brown">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
