import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon_url: string;
  xp_reward: number;
  created_at: string;
}

export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('achievements')
          .select('*')
          .order('xp_reward', { ascending: false });

        if (error) throw error;
        setAchievements(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar logros');
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  return { achievements, loading, error };
} 