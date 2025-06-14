import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export interface UserActivity {
  id: string;
  user_id: string;
  activity_type: string;
  created_at: string;
  metadata: any;
}

export function useUserActivity(userId?: string) {
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        let query = supabase
          .from('user_activity')
          .select('*')
          .order('created_at', { ascending: false });

        if (userId) {
          query = query.eq('user_id', userId);
        }

        const { data, error } = await query;

        if (error) throw error;
        setActivities(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar actividades');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [userId]);

  return { activities, loading, error };
} 