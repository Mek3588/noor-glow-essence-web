
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Sparkles, Leaf, Heart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import RevealOnScroll from './RevealOnScroll';
import { Skeleton } from '@/components/ui/skeleton';

interface MiracleProduct {
  ingredients: string[];
}

const MiracleIngredientsSection = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Ingredient descriptions mapping
  const ingredientDescriptions: { [key: string]: string } = {
    'Coconut Oil': 'Rich in fatty acids that penetrate hair shaft, preventing protein loss and strengthening hair from within.',
    'Jojoba Oil': 'Mimics natural scalp oils, balancing oil production and creating optimal conditions for hair growth.',
    'Argan Oil': 'Packed with vitamin E and antioxidants, nourishes hair follicles and protects against environmental damage.',
    'Rosemary Essential Oil': 'Stimulates blood circulation to the scalp, promoting hair growth and preventing premature graying.',
    'Peppermint Essential Oil': 'Provides cooling sensation while increasing blood flow to hair follicles for enhanced growth.',
    'Vitamin E': 'Powerful antioxidant that repairs damaged hair follicles and promotes healthy hair growth.',
    'Biotin': 'Essential B-vitamin that strengthens hair structure and improves hair thickness and shine.'
  };

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const { data, error } = await supabase
          .from('miracle_growth_products')
          .select('ingredients')
          .eq('is_active', true)
          .single();

        if (error) {
          console.error('Error fetching ingredients:', error);
        } else if (data && data.ingredients) {
          setIngredients(data.ingredients);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIngredients();
  }, []);
  
  return (
    <section id="ingredients" className="bg-gradient-to-br from-miracle-green/5 to-miracle-yellow/10 relative">
      <div className="section-container">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Leaf className="text-miracle-green" size={32} />
              <span className="text-miracle-green font-medium text-lg">Natural Ingredients</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-miracle-brown mb-6">
              Powerful Natural Formula
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our Miracle Growth Hair & Scalp Oil is crafted with premium natural ingredients, 
              each carefully selected for their proven hair-nourishing and growth-promoting properties.
            </p>
          </div>
        </RevealOnScroll>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Skeleton loaders when loading
            Array(6).fill(0).map((_, index) => (
              <Card key={`skeleton-${index}`} className="border-none shadow-lg bg-white">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-2" />
                  <Skeleton className="h-4 w-4/6" />
                </CardContent>
              </Card>
            ))
          ) : (
            ingredients.map((ingredient, index) => (
              <RevealOnScroll key={ingredient} delay={index * 100}>
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden bg-white hover:scale-105 transform group">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-semibold text-miracle-brown flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-miracle-green to-miracle-yellow rounded-full flex items-center justify-center">
                        <Heart className="w-4 h-4 text-white" />
                      </div>
                      {ingredient}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {ingredientDescriptions[ingredient] || 'A premium natural ingredient known for its beneficial properties for hair and scalp health.'}
                    </CardDescription>
                  </CardContent>
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-miracle-yellow/20 to-miracle-green/20 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Sparkles className="w-6 h-6 text-miracle-green absolute top-2 right-2" />
                  </div>
                </Card>
              </RevealOnScroll>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default MiracleIngredientsSection;
