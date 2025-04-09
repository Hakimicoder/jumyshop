
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import initMockData from "./data/mockData";

// Layouts
import MainLayout from "./components/Layout/MainLayout";
import AdminLayout from "./components/Layout/AdminLayout";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import NotFound from "./pages/NotFound";

// Protected Pages
import ProductsPage from "./pages/Products/ProductsPage";
import ProductDetail from "./pages/Products/ProductDetail";
import CartPage from "./pages/Cart/CartPage";

// Admin Pages
import Dashboard from "./pages/Admin/Dashboard";
import ProductsManagement from "./pages/Admin/ProductsManagement";
import UsersManagement from "./pages/Admin/UsersManagement";

const queryClient = new QueryClient();

const App = () => {
  // Initialize mock data when the app loads
  useEffect(() => {
    initMockData();
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            
            {/* Protected Routes (require login) */}
            <Route path="/products" element={<MainLayout requireAuth />}>
              <Route index element={<ProductsPage />} />
            </Route>
            <Route path="/products/:productId" element={<MainLayout requireAuth />}>
              <Route index element={<ProductDetail />} />
            </Route>
            <Route path="/cart" element={<MainLayout requireAuth />}>
              <Route index element={<CartPage />} />
            </Route>
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<ProductsManagement />} />
              <Route path="users" element={<UsersManagement />} />
            </Route>
            
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
