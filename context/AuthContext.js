import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      checkUser();
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        console.log('Auth state changed:', event);
        setUser(session?.user ?? null);
        setLoading(false);
      });
  
      return () => {
        if (subscription && typeof subscription.unsubscribe === 'function') {
          subscription.unsubscribe();
        }
      };
    }, []);

  async function checkUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    } catch (error) {
      console.error('Error checking user:', error.message);
    } finally {
      setLoading(false);
    }
  }
  async function signUp({ email, password }) {
    try {
      console.log('Attempting to sign up with:', email);
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: { email }
        }
      });
      if (error) {
        console.error('Supabase sign-up error:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        if (error.status === 400 && error.code === 'email_address_not_authorized') {
          console.error('Email not authorized. Please check Supabase email settings.');
        }
        throw error;
      }
      console.log('Sign up response:', data);
      return data;
    } catch (error) {
      console.error('Error in signUp function:', error.message);
      console.error('Error details:', JSON.stringify(error, null, 2));
      if (error.status === 500) {
        console.error('Server error. Please check Supabase logs.');
      }
      throw error;
    }
  }

  async function signIn({ email, password }) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error signing in:', error.message);
      throw error;
    }
  }

  async function signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error signing out:', error.message);
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};