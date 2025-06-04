
import React from 'react';
import { Mail, Phone, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-noor-brown text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">NOOR NATURALS</h3>
            <p className="mb-4 text-white/80">
              Premium hair care products made from 100% natural ingredients.
            </p>
            {/* <div className="flex items-center mb-4">
              <div className="flex h-8 w-12 mr-3 rounded overflow-hidden shadow-md animate-float">
                <div className="w-1/3 h-full bg-[#0055A4]"></div>
                <div className="w-1/3 h-full bg-white"></div>
                <div className="w-1/3 h-full bg-[#EF4135]"></div>
              </div>
            </div> */}
            <div className="flex space-x-4">
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#hero" className="text-white/80 hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#ingredients" className="text-white/80 hover:text-white transition-colors">Ingredients</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-white/80 hover:text-white transition-colors">How to Use</a>
              </li>
              <li>
                <a href="#benefits" className="text-white/80 hover:text-white transition-colors">Benefits</a>
              </li>
              <li>
                <a href="#why-us" className="text-white/80 hover:text-white transition-colors">Why Choose Us</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="mr-2" size={18} />
                <span className="text-white/80">hello@noornaturals.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2" size={18} />
                <span className="text-white/80">+33 1 23 45 67 89</span>
              </div>
              {/* <p className="text-white/80 text-sm mt-4">
                Distributed By: Noor Naturals, France
              </p> */}
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/20 text-center text-white/60 text-sm">
          <p>© {new Date().getFullYear()} Noor Naturals. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
