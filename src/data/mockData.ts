
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
      },
      {
        id: 3,
        name: 'Smartwatch Pro',
        description: 'Track your fitness and stay connected with notifications and apps.',
        price: 249.99,
        image: '/placeholder.svg',
        category: 'Wearables',
        featured: true
      },
      {
        id: 4,
        name: 'Tablet Computer',
        description: '10-inch tablet with 128GB storage and all-day battery life.',
        price: 399.99,
        image: '/placeholder.svg',
        category: 'Computers',
        featured: false
      },
      {
        id: 5,
        name: 'Game Controller',
        description: 'Precision gaming controller compatible with multiple platforms.',
        price: 59.99,
        image: '/placeholder.svg',
        category: 'Gaming',
        featured: false
      },
      {
        id: 6,
        name: 'Smart Home Hub',
        description: 'Control all your smart home devices from one central hub.',
        price: 149.99,
        image: '/placeholder.svg',
        category: 'Smart Home',
        featured: false
      },
      {
        id: 7,
        name: 'Wireless Earbuds',
        description: 'True wireless earbuds with premium sound quality.',
        price: 89.99,
        image: '/placeholder.svg',
        category: 'Audio',
        featured: false
      },
      {
        id: 8,
        name: 'Digital Camera',
        description: '24MP digital camera with 4K video recording capabilities.',
        price: 599.99,
        image: '/placeholder.svg',
        category: 'Photography',
        featured: false
      }
    ];
    saveProducts(products);
  }
};

export default initMockData;
