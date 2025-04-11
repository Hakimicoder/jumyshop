
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { addToCart, formatCurrency } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
}

export default function ProductCard({ product, showAddToCart = true }: ProductCardProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    
    // Trigger localStorage event for header to update cart count
    window.dispatchEvent(new Event('storage'));
    
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`
    });
  };

  const viewProduct = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <Card 
      className="product-card cursor-pointer overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={viewProduct}
    >
      <div className="relative h-48 overflow-hidden">
        {product.featured && (
          <div className="absolute top-2 left-2 z-10">
            <span className="featured-tag text-xs font-bold py-1 px-2 rounded">
              Featured
            </span>
          </div>
        )}
        <img 
          src={product.image || '/placeholder.svg'} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300"
          style={{ transform: isHovering ? 'scale(1.05)' : 'scale(1)' }}
        />
        {isHovering && showAddToCart && (
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 flex justify-center space-x-2 transition-opacity duration-200">
            <Button 
              size="sm" 
              variant="secondary" 
              className="w-1/2"
              onClick={viewProduct}
            >
              <Eye className="h-4 w-4 mr-1" /> View
            </Button>
            <Button 
              size="sm" 
              className="w-1/2 bg-primary hover:bg-primary/90"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium text-lg mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-primary font-bold">{formatCurrency(product.price)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 ">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.subtitle}
        </p>
      </CardFooter>
    </Card>
  );
}
