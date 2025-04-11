
import { saveUsers, saveProducts } from '@/lib/utils';

export const initMockData = () => {
  // Only initialize if data doesn't exist yet
  if (!localStorage.getItem('users') || JSON.parse(localStorage.getItem('users') || '[]').length === 0) {
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

  if (!localStorage.getItem('products') || JSON.parse(localStorage.getItem('products') || '[]').length === 0) {
    const products: Product[] = [
      {
        id: 1,
        name: 'Smart Speaker',
        description: 'Premium smart speaker with voice assistant integration for your home.',
        subtitle: 'Premium smart speaker with voice assistant',
        full_description: 'Premium smart speaker with voice assistant integration for your home. Features include high-quality sound, multi-room audio support, and smart home controls.',
        price: 129.99,
        image: '/lovable-uploads/e5f300e2-516e-4a8a-8801-7d9ee396ac30.png',
        category: 'Speakers',
        featured: true
      },
      {
        id: 2,
        name: 'Wireless Headphones',
        description: 'Noise-cancelling headphones with 30-hour battery life.',
        subtitle: 'Noise-cancelling with 30-hour battery',
        full_description: 'Premium noise-cancelling headphones with 30-hour battery life. Features include active noise cancellation, high-quality audio drivers, and comfortable over-ear design.',
        price: 199.99,
        image: '/uploads/headphone.PNG',
        category: 'Audio',
        featured: true
      }
    ];
    saveProducts(products);
  }
};

export default initMockData;
