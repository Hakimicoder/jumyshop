import { createClient } from '@supabase/supabase-js';

// Chargement des variables d'environnement
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Typage des tables de la base Supabase
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          email: string;
          role: 'admin' | 'user';
          created_at: string;
        };
        Insert: {
          id: string;
          username: string;
          email: string;
          role?: 'admin' | 'user';
          created_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          email?: string;
          role?: 'admin' | 'user';
          created_at?: string;
        };
      };
      products: {
        Row: {
          id: number;
          name: string;
          subtitle: string;
          full_description: string;
          price: number;
          image: string;
          category: string;
          featured: boolean;
        };
        Insert: {
          name: string;
          subtitle: string;
          full_description: string;
          price: number;
          image?: string;
          category: string;
          featured?: boolean;
        };
        Update: {
          name?: string;
          subtitle?: string;
          full_description?: string;
          price?: number;
          image?: string;
          category?: string;
          featured?: boolean;
        };
      };
    };
  };
};

// Création du client Supabase
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// ✅ Fonction pour récupérer tous les produits
export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error('Erreur lors de la récupération des produits :', error);
    return [];
  }

  return data || [];
}

// ✅ Fonction pour récupérer tous les profils/utilisateurs
export async function getProfiles() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erreur lors de la récupération des profils :', error);
    return [];
  }

  return data || [];
}
