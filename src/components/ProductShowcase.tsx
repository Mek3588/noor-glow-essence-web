
import React, { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useAdmin } from '@/contexts/AdminContext';

const ProductShowcase = () => {
  const { contentItems } = useAdmin();
  const [products, setProducts] = useState<any[]>([]);
  
  useEffect(() => {
    // Filter products from contentItems
    const productItems = contentItems.filter(item => item.type === 'product');
    setProducts(productItems);
    
    // Fallback if no products are added yet
    if (productItems.length === 0) {
      setProducts([
        {
          id: 'default-1',
          title: 'Noor Facial Oil',
          description: 'Our signature facial oil for radiant skin',
          imageUrl: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80'
        },
        {
          id: 'default-2',
          title: 'Organic Cream',
          description: 'Deeply moisturizing, 100% organic cream',
          imageUrl: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=982&q=80'
        },
        {
          id: 'default-3',
          title: 'Noor Gift Set',
          description: 'Perfect gift for someone special',
          imageUrl: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
        }
      ]);
    }
  }, [contentItems]);

  return (
    <section className="w-full py-20 overflow-hidden bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-noor-brown mb-2">Our Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handcrafted collection of natural skincare products 
            made with ingredients sourced from France
          </p>
        </div>

        <Carousel className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
          <CarouselContent className="-ml-2 md:-ml-4">
            {products.map((product) => (
              <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="relative group h-full rounded-xl overflow-hidden bg-white border border-gray-200 hover:shadow-xl transition-all duration-300">
                  <div className="aspect-square w-full overflow-hidden">
                    <img 
                      src={product.imageUrl} 
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-lg mb-1 text-noor-brown">{product.title}</h3>
                    <p className="text-gray-600 text-sm">{product.description}</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8 gap-2">
            <CarouselPrevious className="relative static left-0 right-auto translate-y-0 rounded-full" />
            <CarouselNext className="relative static right-0 left-auto translate-y-0 rounded-full" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default ProductShowcase;
