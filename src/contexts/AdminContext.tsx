
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
  imageFile?: File | null;
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
  uploadImage: (file: File) => Promise<string>;
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
  const [colorScheme, setColorScheme] = useState<ColorScheme>(() => {
    const saved = localStorage.getItem('adminColorScheme');
    return saved ? JSON.parse(saved) : defaultColorScheme;
  });
  
  const [contentItems, setContentItems] = useState<ContentItem[]>(() => {
    const saved = localStorage.getItem('adminContentItems');
    return saved ? JSON.parse(saved) : [];
  });

  // Apply color scheme to CSS variables
  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', colorScheme.primary);
    document.documentElement.style.setProperty('--color-secondary', colorScheme.secondary);
    document.documentElement.style.setProperty('--color-accent', colorScheme.accent);
  }, [colorScheme]);

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
    setColorScheme(prev => {
      const newColorScheme = { ...prev, ...colors };
      return newColorScheme;
    });
  };

  // Function to handle image uploads
  const uploadImage = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Convert file to data URL
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  };

  const addContentItem = async (item: Omit<ContentItem, 'id'>) => {
    let imageUrl = item.imageUrl;
    
    if (item.imageFile) {
      imageUrl = await uploadImage(item.imageFile);
    }
    
    const newItem = {
      ...item,
      imageUrl,
      id: `item-${Date.now()}`
    };
    
    setContentItems(prev => [...prev, newItem]);
  };

  const updateContentItem = async (id: string, item: Partial<Omit<ContentItem, 'id'>>) => {
    let updates = { ...item };
    
    if (item.imageFile) {
      const imageUrl = await uploadImage(item.imageFile);
      updates = { ...updates, imageUrl };
    }
    
    setContentItems(prev => 
      prev.map(contentItem => 
        contentItem.id === id ? { ...contentItem, ...updates } : contentItem
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
    uploadImage
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
