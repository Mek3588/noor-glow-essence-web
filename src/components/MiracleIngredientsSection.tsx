
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Leaf, Sparkles, Shield } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import { Skeleton } from './ui/skeleton';

interface MiracleProduct {
  ingredients: string[];
}

const MiracleIngredientsSection = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

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
        } else if (data?.ingredients) {
          setIngredients(data.ingredients);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  const ingredientDescriptions: Record<string, string> = {
    'Coconut Oil': 'Deep moisturizing and nourishing properties for hair and scalp health',
    'Jojoba Oil': 'Mimics natural scalp oils, promoting healthy hair growth',
    'Argan Oil': 'Rich in vitamin E and fatty acids for hair strength and shine',
    'Rosemary Essential Oil': 'Stimulates blood circulation to promote hair growth',
    'Peppermint Essential Oil': 'Cooling sensation that invigorates the scalp',
    'Vitamin E': 'Powerful antioxidant that protects and nourishes hair',
    'Biotin': 'Essential vitamin for healthy hair growth and thickness'
  };

  if (loading) {
    return (
      <section className="bg-white py-16">
        <div className="section-container">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6">
                <Skeleton className="h-12 w-12 rounded-full mb-4" />
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="ingredients" className="bg-white py-16">
      <div className="section-container">
        <RevealOnScroll>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="text-miracle-yellow" size={24} />
              <span className="text-miracle-green font-medium">Natural Ingredients</span>
            </div>
            <h2 className="section-title">Pure & Powerful Formula</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our carefully selected natural ingredients work together to nourish your hair and scalp
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ingredients.map((ingredient, index) => (
            <RevealOnScroll key={ingredient} delay={100 + index * 50}>
              <div className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-miracle-green rounded-full flex items-center justify-center mr-4">
                    <Leaf className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-miracle-brown">{ingredient}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {ingredientDescriptions[ingredient] || 'A premium natural ingredient for optimal hair health'}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={600}>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 bg-miracle-green/10 px-6 py-3 rounded-full">
              <Shield className="text-miracle-green" size={20} />
              <span className="text-miracle-brown font-medium">No Harmful Chemicals • Cruelty-Free • Vegan</span>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default MiracleIngredientsSection;
