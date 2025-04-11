
import { Database } from './integrations/supabase/client';

type Product = Database['public']['Tables']['products']['Row'] & {
  description?: string;
  all?: string;
  subtitle?: string;
  full_description?: string;
};

interface CartItem {
  productId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

type Profile = Database['public']['Tables']['profiles']['Row'];

interface AuthState {
  user: Profile | null;
  session: any | null;
  isLoading: boolean;
}

interface AuthContextType {
  user: Profile | null;
  session: any | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
}

interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  role: string;
}
