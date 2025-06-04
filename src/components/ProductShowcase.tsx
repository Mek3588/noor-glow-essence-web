
import React, { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useAdmin } from '@/contexts/AdminContext';
import { ShoppingBag } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const ProductShowcase = () => {
  const { contentItems, isLoading } = useAdmin();
  const [products, setProducts] = useState<any[]>([]);
  
  useEffect(() => {
    // Filter products from contentItems
    const productItems = contentItems.filter(item => item.type === 'product');
    setProducts(productItems);
    
    // Fallback if no products are added yet
    if (productItems.length === 0 && !isLoading) {
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
        },
        {
          id: 'default-4',
          title: 'Hydrating Serum',
          description: 'Intensive hydration for all skin types',
          imageUrl: 'https://images.unsplash.com/photo-1570194065650-d99fb4d8a609?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80'
        },
        {
          id: 'default-5',
          title: 'Noor Body Butter',
          description: 'Rich, nourishing body butter for silky smooth skin',
          imageUrl: 'https://images.unsplash.com/photo-1601612628452-9e99ced43524?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80'
        }
      ]);
    }
  }, [contentItems, isLoading]);

  const LoadingSkeleton = () => (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 md:mb-16">
        <div className="text-center md:text-left md:max-w-lg">
          <Skeleton className="h-8 w-36 mb-4 mx-auto md:mx-0" />
          <Skeleton className="h-4 w-full md:w-3/4 mb-2" />
          <Skeleton className="h-4 w-5/6 md:w-2/3" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array(5).fill(0).map((_, index) => (
          <div key={index} className="bg-white border rounded-xl overflow-hidden shadow-sm">
            <Skeleton className="w-full aspect-square" />
            <div className="p-5">
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="w-full py-12 md:py-20 bg-gradient-to-b from-white to-noor-yellow-light">
      <div className="max-w-screen-2xl mx-auto px-4">
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <>
            <div className="flex flex-col md:flex-row items-center justify-between mb-10 md:mb-16">
              <div className="text-center md:text-left md:max-w-lg">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-noor-brown mb-4 slide-in">
                  Our Products
                </h2>
                {/* <p className="text-gray-600 text-lg max-w-2xl slide-in">
                  Discover our handcrafted collection of natural skincare products 
                  made with ingredients sourced from France
                </p> */}
              </div>
              
              <div className="mt-6 md:mt-0 flex items-center gap-2 slide-in">
                <ShoppingBag className="w-5 h-5 text-noor-olive" />
                <span className="text-noor-brown font-medium">Premium Quality</span>
              </div>
            </div>

            <div className="w-full overflow-hidden -mx-4">
              <Carousel 
                className="w-full px-4"
                opts={{
                  align: "start",
                  loop: true,
                }}
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {products.map((product) => (
                    <CarouselItem key={product.id} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                      <div className="group h-full rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
                        <div className="aspect-square w-full overflow-hidden relative">
                          <img 
                            src={product.imageUrl} 
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/placeholder.svg';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
                            <div className="p-4 text-white text-center w-full transform translate-y-10 group-hover:translate-y-0 transition-transform duration-300">
                              <span className="inline-block px-4 py-1 bg-noor-olive/80 rounded-full text-xs backdrop-blur-sm">
                                View Details
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="font-semibold text-lg mb-1 text-noor-brown group-hover:text-noor-olive transition-colors duration-300">{product.title}</h3>
                          <p className="text-gray-600 text-sm">{product.description}</p>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                
                <div className="flex justify-center mt-8 gap-4">
                  <CarouselPrevious className="relative static left-0 right-auto translate-y-0 rounded-full bg-white/70 backdrop-blur-sm border-noor-olive text-noor-olive hover:bg-noor-olive hover:text-white" />
                  <CarouselNext className="relative static right-0 left-auto translate-y-0 rounded-full bg-white/70 backdrop-blur-sm border-noor-olive text-noor-olive hover:bg-noor-olive hover:text-white" />
                </div>
              </Carousel>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductShowcase;
