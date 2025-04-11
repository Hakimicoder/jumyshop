
import { Database } from './integrations/supabase/client';

type Product = Database['public']['Tables']['products']['Row'];

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
