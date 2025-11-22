export const env = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
} as const;

export function validateEnv() {
  if (!env.supabase.url || !env.supabase.anonKey) {
    throw new Error('Missing required environment variables. Please check your .env file.');
  }
}
