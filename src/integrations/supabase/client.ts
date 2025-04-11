
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xidwwcmiupqolgmjhxwz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpZHd3Y21pdXBxb2xnbWpoeHd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzNjYzOTYsImV4cCI6MjA1OTk0MjM5Nn0.ZNQKVcZQfWMH-sq92uyMbaKcj1XWjoHjmcyXJWpJW3g';

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

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});
