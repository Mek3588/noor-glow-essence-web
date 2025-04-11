
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
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
    <div className="fixed bottom-4 right-4 flex items-center space-x-2 opacity-80 hover:opacity-100 transition-opacity duration-300">
      <div className="flex items-center bg-white py-1 px-2 rounded-md shadow-sm">
        <div className="flex flex-col mr-2">
          <div className="w-8 h-2 bg-blue-600"></div>
          <div className="w-8 h-2 bg-white"></div>
          <div className="w-8 h-2 bg-red-600"></div>
        </div>
        <span className="text-sm font-medium text-gray-700">Made in France</span>
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
