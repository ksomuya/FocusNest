import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://znkbeuwbplipmvzcqrtt.supabase.co';
const supabaseAnonKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpua2JldXdicGxpcG12emNxcnR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkxNjAzMjgsImV4cCI6MjA0NDczNjMyOH0.0-HTJjDB_7zNJmOv-c5qyjJlk26hWqADlfn_wV9SoLA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export const checkSupabaseConnection = async () => {
    try {
      const { data, error } = await supabase.from('your_table_name').select('count', { count: 'exact' });
      if (error) throw error;
      console.log('Supabase connection successful:', data);
      return true;
    } catch (error) {
      console.error('Supabase connection failed:', error.message);
      return false;
    }
  };