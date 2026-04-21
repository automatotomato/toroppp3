import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { User, Session } from '@supabase/supabase-js';

interface Profile {
  id: string;
  email: string;
  full_name: string;
  office_name: string;
  role: string;
  subscription_status: string;
  subscription_expires_at: string | null;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string, officeName: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  hasActiveSubscription: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function isNetworkError(err: any): boolean {
  const msg = err?.message || '';
  return msg === 'Load failed' || msg === 'Failed to fetch' || msg === 'NetworkError when attempting to fetch resource.';
}

async function fetchWithRetry<T>(fn: () => Promise<T>, retries = 2, delay = 1000): Promise<T> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === retries || !isNetworkError(err)) throw err;
      await new Promise(r => setTimeout(r, delay * (attempt + 1)));
    }
  }
  throw new Error('Failed to fetch');
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session } } = await fetchWithRetry(() => supabase.auth.getSession());
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          await loadProfile(session.user.id);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      (async () => {
        if (event === 'PASSWORD_RECOVERY') {
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
          return;
        }

        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          await loadProfile(session.user.id);
        } else {
          setProfile(null);
          setLoading(false);
        }
      })();
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadProfile = async (userId: string) => {
    try {
      const { data, error } = await fetchWithRetry(() =>
        supabase.from('profiles').select('*').eq('id', userId).maybeSingle()
      );

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await fetchWithRetry(() =>
        supabase.auth.signInWithPassword({ email, password })
      );
      return { error };
    } catch (err: any) {
      if (isNetworkError(err)) {
        return { error: { message: 'Unable to connect to the server. Please check your internet connection and try again.' } };
      }
      return { error: { message: err?.message || 'An unexpected error occurred' } };
    }
  };

  const signUp = async (email: string, password: string, fullName: string, officeName: string) => {
    try {
      const { data: authData, error: authError } = await fetchWithRetry(() =>
        supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: { full_name: fullName, office_name: officeName },
          },
        })
      );

      if (authError) return { error: authError };

      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{ id: authData.user.id, email, full_name: fullName, office_name: officeName }]);

        if (profileError) {
          console.error('Profile creation error:', profileError);
          return { error: profileError };
        }
      }

      return { error: null };
    } catch (err: any) {
      if (isNetworkError(err)) {
        return { error: { message: 'Unable to connect to the server. Please check your internet connection and try again.' } };
      }
      return { error: { message: err?.message || 'An unexpected error occurred' } };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  const hasActiveSubscription = () => {
    if (!profile) return false;
    if (profile.subscription_status !== 'active') return false;
    if (!profile.subscription_expires_at) return true;
    return new Date(profile.subscription_expires_at) > new Date();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        loading,
        signIn,
        signUp,
        signOut,
        hasActiveSubscription,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
