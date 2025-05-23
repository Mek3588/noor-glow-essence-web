
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Star, Shield, Leaf, Heart } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import { Skeleton } from './ui/skeleton';

interface MiracleProduct {
  id: string;
  name: string;
  description: string;
  size: string;
  ingredients: string[];
  directions: string;
  warnings: string;
  benefits: string[];
  image_url?: string;
}

const MiracleProductDetails = () => {
  const [product, setProduct] = useState<MiracleProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from('miracle_growth_products')
          .select('*')
          .eq('is_active', true)
          .single();

        if (error) {
          console.error('Error fetching product:', error);
        } else {
          setProduct(data);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  if (loading) {
    return (
      <section className="bg-gradient-to-br from-green-50 to-yellow-50 py-16">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-6" />
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
              </div>
            </div>
            <Skeleton className="h-96 w-full rounded-xl" />
          </div>
        </div>
      </section>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <section className="bg-gradient-to-br from-green-50 to-yellow-50 py-16">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <RevealOnScroll>
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Star className="text-miracle-yellow fill-current" size={24} />
                <span className="text-miracle-green font-medium">Premium Quality</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-miracle-brown leading-tight">
                {product.name}
              </h2>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                {product.description}
              </p>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-miracle-brown mb-4 flex items-center gap-2">
                  <Heart className="text-miracle-green" size={20} />
                  Key Benefits
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {product.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-miracle-green rounded-full"></div>
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Shield className="text-miracle-green" size={16} />
                  <span>100% Natural</span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className="text-miracle-green" size={16} />
                  <span>{product.size}</span>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-miracle-yellow/20 to-miracle-green/20 rounded-3xl blur-xl"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl">
                <img
                  src={product.image_url || "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                  alt={product.name}
                  className="w-full h-80 object-cover rounded-xl"
                />
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-miracle-brown">{product.size}</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 text-miracle-yellow fill-current" />
                      ))}
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="inline-block bg-miracle-green text-white px-6 py-2 rounded-full font-medium">
                      Premium Formula
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

export default MiracleProductDetails;
