import { useState, useEffect } from 'react';
import { getCart } from '@/lib/utils';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const cart = getCart();
    setCartItems(cart);
  }, []);

  return (
    <div>
      <h1>Cart Page</h1>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map(item => (
            <li key={item.productId}>
              {item.name} - Quantity: {item.quantity} - Price: {item.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}
