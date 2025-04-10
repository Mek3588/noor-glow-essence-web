
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types for our context
type ColorScheme = {
  primary: string;
  secondary: string;
  accent: string;
};

type ContentItem = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  type: 'benefit' | 'ingredient' | 'testimonial';
};

type AdminContextType = {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  colorScheme: ColorScheme;
  updateColorScheme: (colors: Partial<ColorScheme>) => void;
  contentItems: ContentItem[];
  addContentItem: (item: Omit<ContentItem, 'id'>) => void;
  updateContentItem: (id: string, item: Partial<Omit<ContentItem, 'id'>>) => void;
  deleteContentItem: (id: string) => void;
};

// Default values
const defaultColorScheme: ColorScheme = {
  primary: '#FEF751', // Yellow
  secondary: '#7D5A47', // Brown
  accent: '#8A8B39', // Olive
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    JSON.parse(localStorage.getItem('adminColorScheme') || JSON.stringify(defaultColorScheme))
  );
  const [contentItems, setContentItems] = useState<ContentItem[]>(
    JSON.parse(localStorage.getItem('adminContentItems') || '[]')
  );

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem('adminColorScheme', JSON.stringify(colorScheme));
  }, [colorScheme]);

  useEffect(() => {
    localStorage.setItem('adminContentItems', JSON.stringify(contentItems));
  }, [contentItems]);

  // Check authentication on load
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  // Simple password authentication
  const login = (password: string) => {
    // This is just for demo purposes - in a real app, use a secure authentication method
    if (password === 'nooradmin2024') {
      setIsAuthenticated(true);
      localStorage.setItem('adminToken', 'authenticated');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminToken');
  };

  const updateColorScheme = (colors: Partial<ColorScheme>) => {
    setColorScheme(prev => ({ ...prev, ...colors }));
  };

  const addContentItem = (item: Omit<ContentItem, 'id'>) => {
    const newItem = {
      ...item,
      id: `item-${Date.now()}`
    };
    setContentItems(prev => [...prev, newItem]);
  };

  const updateContentItem = (id: string, item: Partial<Omit<ContentItem, 'id'>>) => {
    setContentItems(prev => 
      prev.map(contentItem => 
        contentItem.id === id ? { ...contentItem, ...item } : contentItem
      )
    );
  };

  const deleteContentItem = (id: string) => {
    setContentItems(prev => prev.filter(item => item.id !== id));
  };

  const value = {
    isAuthenticated,
    login,
    logout,
    colorScheme,
    updateColorScheme,
    contentItems,
    addContentItem,
    updateContentItem,
    deleteContentItem,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
