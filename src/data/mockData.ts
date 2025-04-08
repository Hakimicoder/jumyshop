
import { saveUsers, saveProducts, getUsers, getProducts } from '@/lib/utils';

export const initMockData = () => {
  // Only initialize if data doesn't exist yet
  if (getUsers().length === 0) {
    const users: User[] = [
      {
        id: 1,
        username: 'admin',
        password: 'admin123', // In a real app, this would be hashed
        email: 'admin@electroshop.com',
        role: 'admin'
      },
      {
        id: 2,
        username: 'adminjumael',
        password: 'admin2005', // In a real app, this would be hashed
        email: 'jumaelkamga1@gmail.com',
        role: 'admin'
      },
      {
        id: 3,
        username: 'user',
        password: 'user123', // In a real app, this would be hashed
        email: 'user@example.com',
        role: 'user'
      }
    ];
    saveUsers(users);
  }

  if (getProducts().length === 0) {
    const products: Product[] = [
      {
        id: 1,
        name: 'Smart Speaker',
        description: 'Premium smart speaker with voice assistant integration for your home.',
        price: 129.99,
        image: '/lovable-uploads/e5f300e2-516e-4a8a-8801-7d9ee396ac30.png',
        category: 'Speakers',
        featured: true
      },
      {
        id: 2,
        name: 'Wireless Headphones',
        description: 'Noise-cancelling headphones with 30-hour battery life.',
        price: 199.99,
        image: '/placeholder.svg',
        category: 'Audio',
        featured: true
      }
    ];
    saveProducts(products);
  }
};

export default initMockData;
