
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Type pour les options de requête
interface QueryOptions<T> {
  table: string;
  columns?: string;
  filter?: Record<string, any>;
  limit?: number;
  orderBy?: { column: string; ascending?: boolean };
}

// Hook personnalisé pour les requêtes Supabase
export function useSupabaseQuery<T>(options: QueryOptions<T>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Construire la requête de base
        let query = supabase.from(options.table).select(options.columns || '*');

        // Ajouter des filtres si spécifiés
        if (options.filter) {
          Object.entries(options.filter).forEach(([key, value]) => {
            query = query.eq(key, value);
          });
        }

        // Ajouter un tri si spécifié
        if (options.orderBy) {
          query = query.order(options.orderBy.column, {
            ascending: options.orderBy.ascending ?? true,
          });
        }

        // Ajouter une limite si spécifiée
        if (options.limit) {
          query = query.limit(options.limit);
        }

        // Exécuter la requête
        const { data: result, error } = await query;
        
        if (error) throw error;

        setData(result as T[]);
        setError(null);
      } catch (err) {
        console.error('Supabase query error:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [options.table, options.columns, JSON.stringify(options.filter), options.limit, 
      options.orderBy?.column, options.orderBy?.ascending]);

  return { data, loading, error, setData };
}
