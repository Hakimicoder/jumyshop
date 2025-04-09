
interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  role: 'user' | 'admin';
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured: boolean;
}

interface CartItem {
  productId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}
