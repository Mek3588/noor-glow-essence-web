
import React, { useState, useEffect } from 'react';
import { ChevronDown, Leaf } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';

const HeroSection = () => {
  const { contentItems } = useAdmin();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Filter product images for the carousel
  const productImages = contentItems
    .filter(item => item.type === 'product' && item.imageUrl)
    .map(item => item.imageUrl);
    
  // Fallback images if no products are added yet
  const fallbackImages = [
    'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=982&q=80',
    'https://images.unsplash.com/photo-1570194065650-d99fb4d8a609?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    '/lovable-uploads/fb067b85-75b4-422d-98d5-27ebc43210d0.png'
  ];
  
  const images = productImages.length > 0 ? productImages : fallbackImages;
  
  // Auto-rotate images
  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-yellow pt-16 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(8px)'
            }}
          />
        ))}
      </div>
      
      <div className="section-container flex flex-col items-center justify-center relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-4 animate-fade-in">
            <h4 className="text-lg md:text-xl text-noor-olive mb-2">100% Original</h4>
          </div>
        </RevealOnScroll>
        
        <RevealOnScroll delay={200}>
          <div className="text-center mb-6 animate-fade-in-slow">
            <div className="flex items-center justify-center">
              <div className="w-48 h-48 md:w-56 md:h-56 mb-4 relative">
                {images.map((image, index) => (
                  <img 
                    key={index}
                    src={image} 
                    alt={`Product Image ${index + 1}`} 
                    className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-1000 ease-in-out animate-float ${
                      index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/lovable-uploads/fb067b85-75b4-422d-98d5-27ebc43210d0.png';
                    }}
                  />
                ))}
                <div className="absolute -z-10 top-0 left-0 w-full h-full flex items-center justify-center opacity-20 animate-pulse">
                  <Leaf className="text-noor-olive w-32 h-32" />
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
        
        <RevealOnScroll delay={400}>
          <div className="text-center my-8 animate-fade-in backdrop-blur-sm bg-white/30 px-6 py-4 rounded-lg">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-noor-brown mb-4 relative overflow-hidden">
              <span className="bg-clip-text text-transparent bg-gradient-olive animate-slide-in-right inline-block">
                HAIR ESSENCE OIL
              </span>
            </h2>
            <div className="bg-noor-brown text-white px-6 py-3 inline-block rounded-lg mt-2 transform transition-transform hover:scale-105 duration-300">
              <p className="text-lg md:text-xl font-medium">FOR LONGER AND THICKER HAIR</p>
            </div>
          </div>
        </RevealOnScroll>
        
        <RevealOnScroll delay={600}>
          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <Button 
              variant="outline"
              className="border-2 border-noor-olive text-noor-olive hover:bg-noor-olive hover:text-white px-8 py-6 rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl backdrop-blur-sm"
              asChild
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </RevealOnScroll>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
          <a href="#ingredients" className="text-noor-brown hover:text-noor-olive transition-colors p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40">
            <ChevronDown size={32} />
          </a>
        </div>
      </div>
      
      {/* Image navigation dots */}
      {images.length > 1 && (
        <div className="absolute bottom-32 left-0 right-0 flex justify-center gap-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-noor-olive scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => setCurrentImageIndex(index)}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroSection;
