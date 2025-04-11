
import React from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { CheckCircle, Star } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import RevealOnScroll from './RevealOnScroll';

const WhyChooseUsSection = () => {
  const { contentItems } = useAdmin();
  const testimonialItems = contentItems.filter(item => item.type === 'testimonial');
  
  // Fallback testimonials in case there are none in the admin panel
  const defaultTestimonials = [
    {
      id: 'default-1',
      title: 'Sarah M.',
      description: "I've been using the hair oil for 3 months and my hair has never been healthier. My hair growth has increased and it's so much shinier now!",
      imageUrl: ''
    },
    {
      id: 'default-2',
      title: 'Ahmed K.',
      description: "After years of trying different products, I finally found something that works. My hair feels stronger and I've noticed much less breakage.",
      imageUrl: ''
    },
    {
      id: 'default-3',
      title: 'Maria L.',
      description: "The scent is amazing and my hair absorbs it without feeling greasy. I've gotten so many compliments since I started using this oil!",
      imageUrl: ''
    }
  ];

  // Display admin testimonials if available, otherwise show defaults
  const displayTestimonials = testimonialItems.length > 0 ? testimonialItems : defaultTestimonials;
  
  const features = [
    {
      title: 'Premium Quality',
      description: 'Made with the highest quality natural ingredients',
    },
    {
      title: 'Trusted Formula',
      description: 'Developed and tested by hair care experts',
    },
    {
      title: 'Customer Satisfaction',
      description: 'Thousands of happy customers worldwide',
    },
    {
      title: 'Free from Chemicals',
      description: 'No parabens, sulfates, or synthetic fragrances',
    },
  ];
  
  return (
    <section id="why-us" className="bg-noor-yellow/5 relative">
      <div className="section-container">
        <RevealOnScroll>
          <h2 className="section-title text-center mx-auto after:left-1/2 after:-translate-x-1/2">
            Why Choose Us
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Discover why our customers trust our products and what makes our hair oil stand out from the rest.
          </p>
        </RevealOnScroll>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <RevealOnScroll key={index} delay={index * 100}>
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-noor-olive flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-noor-brown mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
        
        <RevealOnScroll delay={400}>
          <h3 className="text-2xl font-semibold text-noor-brown text-center mb-8">
            What Our Customers Say
          </h3>
        </RevealOnScroll>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayTestimonials.map((testimonial, index) => (
            <RevealOnScroll key={testimonial.id} delay={index * 100}>
              <Card className="border-none shadow-md hover:shadow-xl transition-shadow duration-300 bg-white overflow-hidden hover:scale-105 transform transition-transform duration-300">
                <CardHeader className="pb-2 flex flex-col items-center">
                  <div className="flex justify-center mb-4">
                    {testimonial.imageUrl ? (
                      <img 
                        src={testimonial.imageUrl} 
                        alt={testimonial.title}
                        className="w-16 h-16 rounded-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.svg'; 
                        }}
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-noor-yellow flex items-center justify-center">
                        <Star className="w-8 h-8 text-noor-brown" />
                      </div>
                    )}
                  </div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-yellow-500" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 italic">{testimonial.description}</p>
                </CardContent>
                <CardFooter className="pt-2 flex justify-center">
                  <p className="font-semibold text-noor-brown">{testimonial.title}</p>
                </CardFooter>
              </Card>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
