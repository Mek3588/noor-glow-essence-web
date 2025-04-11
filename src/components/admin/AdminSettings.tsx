
import React, { useState, useEffect } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Paintbrush, RefreshCw } from 'lucide-react';

const AdminSettings = () => {
  const { colorScheme, updateColorScheme } = useAdmin();
  const { toast } = useToast();
  
  const [colors, setColors] = useState({
    primary: colorScheme.primary,
    secondary: colorScheme.secondary,
    accent: colorScheme.accent,
  });

  // Update local state when context changes
  useEffect(() => {
    setColors({
      primary: colorScheme.primary,
      secondary: colorScheme.secondary,
      accent: colorScheme.accent,
    });
  }, [colorScheme]);

  const handleColorChange = (key: keyof typeof colors, value: string) => {
    setColors(prev => ({ ...prev, [key]: value }));
  };

  const saveColorChanges = () => {
    updateColorScheme(colors);
    
    // Apply CSS custom properties directly to the document root element
    document.documentElement.style.setProperty('--color-primary', colors.primary);
    document.documentElement.style.setProperty('--color-secondary', colors.secondary);
    document.documentElement.style.setProperty('--color-accent', colors.accent);
    
    // Also update the noor- prefixed colors in Tailwind
    document.documentElement.style.setProperty('--noor-yellow', colors.primary);
    document.documentElement.style.setProperty('--noor-brown', colors.secondary);
    document.documentElement.style.setProperty('--noor-olive', colors.accent);
    
    toast({
      title: "Colors updated",
      description: "Your color scheme changes have been saved and applied.",
    });
  };

  const resetToDefault = () => {
    const defaultColors = {
      primary: '#FEF751', // Yellow
      secondary: '#7D5A47', // Brown
      accent: '#8A8B39', // Olive
    };
    
    setColors(defaultColors);
    updateColorScheme(defaultColors);
    
    // Reset CSS properties
    document.documentElement.style.setProperty('--color-primary', defaultColors.primary);
    document.documentElement.style.setProperty('--color-secondary', defaultColors.secondary);
    document.documentElement.style.setProperty('--color-accent', defaultColors.accent);
    
    // Reset Tailwind colors
    document.documentElement.style.setProperty('--noor-yellow', defaultColors.primary);
    document.documentElement.style.setProperty('--noor-brown', defaultColors.secondary);
    document.documentElement.style.setProperty('--noor-olive', defaultColors.accent);
    
    toast({
      title: "Colors reset",
      description: "Your color scheme has been reset to default values.",
    });
  };

  const colorOptions = [
    { id: 'primary', label: 'Primary Color (Yellow)', description: 'Used for main buttons and highlights' },
    { id: 'secondary', label: 'Secondary Color (Brown)', description: 'Used for text and secondary elements' },
    { id: 'accent', label: 'Accent Color (Olive)', description: 'Used for accents and special elements' },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-noor-brown mb-6">Settings</h1>
      
      <Tabs defaultValue="colors">
        <TabsList className="mb-6">
          <TabsTrigger value="colors" className="flex items-center gap-2">
            <Paintbrush className="w-4 h-4" />
            <span>Color Scheme</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="colors">
          <Card>
            <CardHeader>
              <CardTitle>Color Settings</CardTitle>
              <CardDescription>
                Customize the color scheme for your website. Changes will apply to the frontend.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {colorOptions.map((option) => (
                  <div key={option.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={option.id} className="text-base font-medium">{option.label}</Label>
                      <div 
                        className="w-8 h-8 rounded-full border border-gray-200 shadow-sm" 
                        style={{ backgroundColor: colors[option.id as keyof typeof colors] }}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Input
                        id={option.id}
                        type="text"
                        value={colors[option.id as keyof typeof colors]}
                        onChange={(e) => handleColorChange(option.id as keyof typeof colors, e.target.value)}
                        className="font-mono"
                      />
                      <Input
                        type="color"
                        value={colors[option.id as keyof typeof colors]}
                        onChange={(e) => handleColorChange(option.id as keyof typeof colors, e.target.value)}
                        className="w-12 p-1 h-10"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                ))}
                
                <div className="flex items-center gap-4 pt-4">
                  <Button onClick={saveColorChanges} className="bg-noor-olive hover:bg-noor-olive-light text-white">
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={resetToDefault} className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Reset to Default
                  </Button>
                </div>
                
                <div className="mt-8 p-4 rounded-lg bg-muted">
                  <h3 className="font-medium mb-2">Preview</h3>
                  <div className="flex flex-wrap gap-4">
                    <div 
                      style={{ backgroundColor: colors.primary }} 
                      className="w-24 h-12 rounded-md shadow-sm flex items-center justify-center font-medium"
                    >
                      Primary
                    </div>
                    <div 
                      style={{ backgroundColor: colors.secondary, color: 'white' }} 
                      className="w-24 h-12 rounded-md shadow-sm flex items-center justify-center font-medium"
                    >
                      Secondary
                    </div>
                    <div 
                      style={{ backgroundColor: colors.accent, color: 'white' }} 
                      className="w-24 h-12 rounded-md shadow-sm flex items-center justify-center font-medium"
                    >
                      Accent
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4">
                    <Button style={{ backgroundColor: colors.primary, color: colors.secondary }}>
                      Primary Button
                    </Button>
                    <Button 
                      variant="outline" 
                      style={{ borderColor: colors.secondary, color: colors.secondary }}
                    >
                      Secondary Button
                    </Button>
                    <Button 
                      style={{ backgroundColor: colors.accent, color: 'white' }}
                    >
                      Accent Button
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
