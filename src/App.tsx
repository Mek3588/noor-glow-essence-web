
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { AdminProvider } from "./contexts/AdminContext";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  // Initialize CSS variables for color scheme on first load
  useEffect(() => {
    const savedColors = localStorage.getItem('adminColorScheme');
    if (savedColors) {
      const colors = JSON.parse(savedColors);
      document.documentElement.style.setProperty('--color-primary', colors.primary);
      document.documentElement.style.setProperty('--color-secondary', colors.secondary);
      document.documentElement.style.setProperty('--color-accent', colors.accent);
    } else {
      // Set default colors
      document.documentElement.style.setProperty('--color-primary', '#FEF751');
      document.documentElement.style.setProperty('--color-secondary', '#7D5A47');
      document.documentElement.style.setProperty('--color-accent', '#8A8B39');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AdminProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AdminProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
