
import React from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import RevealOnScroll from './RevealOnScroll';

const IngredientsSection = () => {
  const { contentItems } = useAdmin();
  const ingredientItems = contentItems.filter(item => item.type === 'ingredient');
  
  // Fallback ingredients in case there are none in the admin panel
  const defaultIngredients = [
    {
      id: 'default-1',
      title: 'Argan Oil',
      description: 'Rich in vitamins and antioxidants, argan oil helps to nourish your hair and protect it from damage.',
      imageUrl: '/lovable-uploads/b49771c0-c998-442e-a1a9-6cabc432cb90.png'
    },
    {
      id: 'default-2',
      title: 'Coconut Oil',
      description: 'Known for its moisturizing properties, coconut oil helps to prevent protein loss and keep your hair strong.',
      imageUrl: '/lovable-uploads/b49771c0-c998-442e-a1a9-6cabc432cb90.png'
    },
    {
      id: 'default-3',
      title: 'Jojoba Oil',
      description: 'Similar to the natural oils in your scalp, jojoba oil helps to balance oil production and promote healthy hair.',
      imageUrl: '/lovable-uploads/b49771c0-c998-442e-a1a9-6cabc432cb90.png'
    }
  ];

  // Display admin ingredients if available, otherwise show defaults
  const displayIngredients = ingredientItems.length > 0 ? ingredientItems : defaultIngredients;
  
  return (
    <section id="ingredients" className="bg-noor-yellow/10 relative">
      <div className="section-container">
        <RevealOnScroll>
          <h2 className="section-title text-center mx-auto after:left-1/2 after:-translate-x-1/2">
            Key Ingredients
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Our hair oil is crafted with the finest natural ingredients, carefully selected for their hair-nourishing properties.
          </p>
        </RevealOnScroll>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {displayIngredients.map((ingredient, index) => (
            <RevealOnScroll key={ingredient.id} delay={index * 100}>
              <Card className="border-none shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden bg-white hover:scale-105 transform transition-transform duration-300">
                <div className="relative h-48 overflow-hidden bg-noor-yellow/20">
                  {ingredient.imageUrl ? (
                    <img 
                      src={ingredient.imageUrl} 
                      alt={ingredient.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/lovable-uploads/b49771c0-c998-442e-a1a9-6cabc432cb90.png';
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Sparkles className="w-12 h-12 text-noor-olive" />
                    </div>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-semibold text-noor-brown">
                    {ingredient.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {ingredient.description}
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

export default IngredientsSection;
