
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Flag } from 'lucide-react';
import { Button } from './ui/button';

const HiddenAdminButton = () => {
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();
  
  const toggleButtonVisibility = () => {
    setShowButton(!showButton);
  };
  
  const handleClick = () => {
    navigate('/admin-login');
  };

  return (
    <div className="fixed bottom-4 right-4 flex items-center space-x-2 opacity-40 hover:opacity-100 transition-opacity duration-300">
      <div className="flex items-center mr-2">
        <Flag size={14} className="text-blue-600 mr-1" />
        <div className="flex flex-col">
          <div className="w-6 h-1.5 bg-blue-600"></div>
          <div className="w-6 h-1.5 bg-white"></div>
          <div className="w-6 h-1.5 bg-red-600"></div>
        </div>
      </div>
      
      <button
        onClick={toggleButtonVisibility}
        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700"
        aria-label={showButton ? "Hide admin button" : "Show admin button"}
      >
        {showButton ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
      
      {showButton && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleClick}
          className="bg-white border-noor-brown/20 text-noor-brown hover:bg-noor-brown hover:text-white animate-fade-in text-xs"
        >
          Admin Login
        </Button>
      )}
    </div>
  );
};

export default HiddenAdminButton;
