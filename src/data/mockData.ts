import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types';
import { Database } from '@/integrations/supabase/client';

type User = Database['public']['Tables']['profiles']['Insert'];
type ProductInsert = Database['public']['Tables']['products']['Insert'];

export const initMockData = async () => {
  try {
    // Vérifie s'il y a déjà des profils
    const { data: existingUsers, error: usersError } = await supabase
      .from('profiles')
      .select();

    if (!usersError && existingUsers && existingUsers.length === 0) {
      const users: User[] = [
        {
          id: '1',
          username: 'admin',
          email: 'admin@electroshop.com',
          role: 'admin',
        },
        {
          id: '2',
          username: 'adminjumael',
          email: 'jumaelkamga1@gmail.com',
          role: 'admin',
        },
        {
          id: '3',
          username: 'user',
          email: 'user@example.com',
          role: 'user',
        },
      ];

      await supabase.from('profiles').insert(users);
      console.log('✔️ Utilisateurs mock insérés.');
    }

    // Vérifie s'il y a déjà des produits
    const { data: existingProducts, error: productsError } = await supabase
      .from('products')
      .select();

    if (!productsError && existingProducts && existingProducts.length === 0) {
      const products: ProductInsert[] = [
        {
          name: 'Smart Speaker',
          subtitle: 'Premium smart speaker with voice assistant',
          full_description:
            'Premium smart speaker with voice assistant integration for your home. Features include high-quality sound, multi-room audio support, and smart home controls.',
          price: 129.99,
          image: '/lovable-uploads/e5f300e2-516e-4a8a-8801-7d9ee396ac30.png',
          category: 'Speakers',
          featured: true,
        },
        {
          name: 'Wireless Headphones',
          subtitle: 'Noise-cancelling with 30-hour battery',
          full_description:
            'Premium noise-cancelling headphones with 30-hour battery life. Features include active noise cancellation, high-quality audio drivers, and comfortable over-ear design.',
          price: 199.99,
          image: '/uploads/headphone.PNG',
          category: 'Audio',
          featured: true,
        },
      ];

      await supabase.from('products').insert(products);
      console.log('✔️ Produits mock insérés.');
    }
  } catch (error) {
    console.error('❌ Erreur lors de l’initialisation des données mock :', error);
  }
};

export default initMockData;
