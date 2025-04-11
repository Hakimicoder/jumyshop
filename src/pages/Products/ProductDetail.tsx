
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { addToCart, formatCurrency } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";
import { Product } from '@/types';

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', Number(productId))
          .single();
        
        if (error) throw error;
        
        if (data) {
          setProduct(data);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      
      // Trigger localStorage event for header to update cart count
      window.dispatchEvent(new Event('storage'));
      
      toast({
        title: "Added to Cart",
        description: `${quantity} ${quantity === 1 ? 'item' : 'items'} added to your cart.`
      });
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(Number(e.target.value));
  };

  const goBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="py-24">
          <h1 className="text-2xl font-bold mb-4">Loading product...</h1>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="py-24">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button onClick={goBack}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Button variant="ghost" onClick={goBack} className="mb-8">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Products
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-gray-100 p-8 rounded-lg flex items-center justify-center">
          <img 
            src={product.image || '/placeholder.svg'} 
            alt={product.name} 
            className="max-h-96 object-contain"
          />
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="text-2xl font-bold text-primary mb-6">
            {formatCurrency(product.price)}
          </div>
          
          <div className="mb-8">
            <p className="text-gray-600 mb-4">{product.subtitle}</p>
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-600 mr-2">Category:</span>
              <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                {product.category}
              </span>
            </div>
          </div>
          
          <div className="py-6 border-t border-b border-gray-200 mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-1/3">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-full h-10 pl-3 pr-8 border rounded-md bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-2/3">
                <Button size="lg" className="w-full" onClick={handleAddToCart}>
                  <ShoppingCart className="h-5 w-5 mr-2" /> Add to Cart
                </Button>
              </div>
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="space-y-4">
            <div>
              <button
                className="flex w-full items-center justify-between py-3 text-left text-lg font-medium"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <span>Product Details</span>
                <ChevronDown 
                  className={`h-5 w-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                />
              </button>
              {isExpanded && (
                <div className="pt-2 pb-4 text-sm text-gray-600">
                  <p>{product.full_description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
