
import React, { useState, useEffect } from 'react';
import { Menu, X, Flag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { name: 'Home', href: '/#hero' },
    { name: 'Ingredients', href: '/#ingredients' },
    { name: 'How to Use', href: '/#how-to-use' },
    { name: 'Benefits', href: '/#benefits' },
    { name: 'Why Us', href: '/#why-us' },
  ];

  return (
    <nav
      className={cn(
        'fixed w-full z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/90 backdrop-blur-sm shadow-md py-2'
          : 'bg-transparent py-4'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-noor-brown">NOOR NATURALS</span>
            </Link>
            <div className="ml-4 flex items-center">
              <Flag className="mr-1 text-blue-600" size={24} />
              <span className="font-medium text-noor-brown">Made in France</span>
            </div>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-noor-brown hover:text-noor-olive font-medium transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <Link
                to="/contact"
                className="bg-noor-olive text-white px-4 py-2 rounded-md hover:bg-noor-olive-light transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-noor-brown hover:text-noor-olive"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div
          className={cn(
            'md:hidden absolute left-0 right-0 bg-white transition-all duration-300 overflow-hidden shadow-md',
            isOpen ? 'max-h-96 py-4' : 'max-h-0'
          )}
        >
          <div className="px-4 pt-2 pb-3 space-y-1">
            <div className="py-2 mb-2 flex items-center">
              <Flag className="mr-1 text-blue-600" size={24} />
              <span className="font-medium text-noor-brown">Made in France</span>
            </div>
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-2 text-noor-brown hover:text-noor-olive"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <Link
              to="/contact"
              className="block py-2 mt-4 bg-noor-olive text-white px-4 rounded-md hover:bg-noor-olive-light text-center"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
