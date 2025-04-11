import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Link } from 'react-router-dom';
import { ChevronRight, Truck, CreditCard, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getProducts } from '@/lib/utils';
import ProductCard from '@/components/Product/ProductCard';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const products = await getProducts();
        setFeaturedProducts(products.filter(product => product.featured).slice(0, 3));
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Latest Audio <span className="text-primary">System</span>
              </h1>
              <p className="text-xl text-gray-300">
                Premium sound quality with smart features. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur reiciendis quo in impedit explicabo nulla!
              </p>
              <div className="pt-4">
                {/* <span className="bg-primary text-black font-bold px-4 py-2 inline-block">
                  Offer 20% off
                </span> */}
              </div>
              <div>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-black">
                  Shop Now
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="/uploads/headphone2.png" 
                alt="Featured Audio System" 
                className="w-full h-auto logo-bounce"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Shipping Worldwide</h3>
              <p className="text-muted-foreground">On all orders over $100</p>
            </div>
            <div className="p-6">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
              <p className="text-muted-foreground">100% secure payment methods</p>
            </div>
            <div className="p-6">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                <RotateCcw className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Money Back Guarantee</h3>
              <p className="text-muted-foreground">30 day money back guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/products" className="flex items-center text-primary font-medium">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading featured products...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          {!isLoading && featuredProducts.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No featured products available.
            </div>
          )}
        </div>
      </section>

      {/* Call to action */}
      <section className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Shop?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Create an account to access our full catalog and start enjoying exclusive deals and offers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/register">Create Account</Link>
            </Button>
            <Button size="lg" className="text-white bg-transparent border-white hover:bg-primary hover:text-black" asChild>
              <Link to="/login">Log In</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
