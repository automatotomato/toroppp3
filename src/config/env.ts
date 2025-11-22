export const env = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
} as const;

export function validateEnv() {
  if (!env.supabase.url || !env.supabase.anonKey) {
    console.error('Environment validation failed:', {
      url: env.supabase.url,
      anonKeyPresent: !!env.supabase.anonKey,
      allEnvVars: import.meta.env
    });
    throw new Error(`Missing required environment variables. URL: ${env.supabase.url ? 'present' : 'MISSING'}, Key: ${env.supabase.anonKey ? 'present' : 'MISSING'}`);
  }
}
