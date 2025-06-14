import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export function useUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error) setUsers(data || []);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  return { users, loading };
} 