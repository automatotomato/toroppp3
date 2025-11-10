import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fefhgmyogqvdhuzkjynu.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlZmhnbXlvZ3F2ZGh1emtqeW51Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3MTQ5NDYsImV4cCI6MjA3ODI5MDk0Nn0.smbjGZ_f5BG5acjjSnwe-Bzxa7H4BvrS67ommVWhIp4'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: {
    schema: 'public'
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true
  }
})

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          office_name: string | null
          role: string
          subscription_status: string
          subscription_expires_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          office_name?: string | null
          role?: string
          subscription_status?: string
          subscription_expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          office_name?: string | null
          role?: string
          subscription_status?: string
          subscription_expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          email: string
          plan_type: string
          full_name: string
          office_name: string
          amount_paid: number
          payment_status: string
          paid_at: string | null
          created_at: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          id?: string
          email: string
          plan_type: string
          full_name: string
          office_name: string
          amount_paid: number
          payment_status?: string
          paid_at?: string | null
          created_at?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          id?: string
          email?: string
          plan_type?: string
          full_name?: string
          office_name?: string
          amount_paid?: number
          payment_status?: string
          paid_at?: string | null
          created_at?: string
          updated_at?: string
          user_id?: string | null
        }
      }
      stripe_user_subscriptions: {
        Row: {
          customer_id: string
          subscription_id: string | null
          subscription_status: string
          price_id: string | null
          current_period_start: number | null
          current_period_end: number | null
          cancel_at_period_end: boolean | null
          payment_method_brand: string | null
          payment_method_last4: string | null
        }
      }
    }
    Views: {
      stripe_user_subscriptions: {
        Row: {
          customer_id: string
          subscription_id: string | null
          subscription_status: string
          price_id: string | null
          current_period_start: number | null
          current_period_end: number | null
          cancel_at_period_end: boolean | null
          payment_method_brand: string | null
          payment_method_last4: string | null
        }
      }
    }
  }
}