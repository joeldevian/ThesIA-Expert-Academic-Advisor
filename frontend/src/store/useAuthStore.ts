import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import type { Session } from '@supabase/supabase-js'

interface AuthState {
    session: Session | null
    loading: boolean
    signInWithGoogle: () => Promise<void>
    signOut: () => Promise<void>
    initializeAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
    session: null,
    loading: true,

    signInWithGoogle: async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/dashboard`,
            },
        })
        if (error) console.error('Error signing in:', error.message)
    },

    signOut: async () => {
        const { error } = await supabase.auth.signOut()
        if (error) console.error('Error signing out:', error.message)
        set({ session: null })
    },

    initializeAuth: async () => {
        set({ loading: true })

        // Check active session
        const { data: { session } } = await supabase.auth.getSession()
        set({ session, loading: false })

        // Listen for auth changes
        supabase.auth.onAuthStateChange((_event: any, session: any) => {
            set({ session, loading: false })
        })
    },
}))
