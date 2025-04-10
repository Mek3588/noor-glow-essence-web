
import React from 'react';
import { Leaf, Droplet } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

interface IngredientProps {
  name: string;
  scientific: string;
  delay: number;
}

const Ingredient = ({ name, scientific, delay }: IngredientProps) => {
  return (
    <RevealOnScroll delay={delay} className="mb-6">
      <div className="flex items-start space-x-4 group">
        <div className="p-2 bg-noor-yellow-light rounded-full mt-1 group-hover:bg-noor-yellow transition-colors">
          <Droplet className="text-noor-olive" size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-noor-brown">{name}</h3>
          <p className="text-noor-olive italic">{scientific}</p>
        </div>
      </div>
    </RevealOnScroll>
  );
};

const IngredientsSection = () => {
  const ingredients = [
    { name: 'Coconut Oil', scientific: 'Cocos Nucifera' },
    { name: 'Olive Fruit Oil', scientific: 'Olea Europaea' },
    { name: 'Castor Seed Oil', scientific: 'Ricinus Communis' },
    { name: 'Peppermint Oil', scientific: 'Mentha Piperita' },
    { name: 'Rosemary Leaf Oil', scientific: 'Rosmarinus Officinalis' },
  ];

  return (
    <section id="ingredients" className="bg-white">
      <div className="section-container">
        <RevealOnScroll>
          <h2 className="section-title text-left">Ingredients</h2>
        </RevealOnScroll>
        
        <div className="mt-10 grid md:grid-cols-2 gap-x-12 gap-y-8">
          <RevealOnScroll delay={200}>
            <div className="bg-gradient-to-b from-noor-yellow-light to-transparent p-6 rounded-xl mb-6 md:mb-0">
              <div className="flex items-center mb-4">
                <Leaf className="text-noor-olive mr-2" size={24} />
                <h3 className="font-bold text-xl">100% Natural Oils</h3>
              </div>
              <p className="text-noor-brown mb-4">
                Our Hair Essence Oil is formulated with premium natural oils, 
                carefully selected to promote hair growth and nourish your hair 
                from roots to tips.
              </p>
              <p className="text-noor-brown">
                Each ingredient serves a specific purpose in improving hair health, 
                thickness, and shine.
              </p>
            </div>
          </RevealOnScroll>
          
          <div className="space-y-2">
            {ingredients.map((ingredient, index) => (
              <Ingredient 
                key={ingredient.name}
                name={ingredient.name}
                scientific={ingredient.scientific}
                delay={300 + index * 100}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IngredientsSection;
