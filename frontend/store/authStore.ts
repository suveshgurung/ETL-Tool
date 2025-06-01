// lib/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService, User } from '@/lib/auth';

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  signin: (email: string, password: string) => Promise<string | null>;
  signup: (email: string, password: string) => Promise<string | null>;
  signout: () => Promise<void>;
  getUserFromToken: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      signin: async (email, password) => {
        const res = await authService.signin(email, password);
        if (res.access_token && res.user) {
          set({
            user: res.user,
            token: res.access_token,
            isAuthenticated: true,
          });
          return null;
        }
        return res.error || 'Login failed';
      },

      signup: async (email, password) => {
        const res = await authService.signup(email, password);
        if (res.access_token && res.user) {
          set({
            user: res.user,
            token: res.access_token,
            isAuthenticated: true,
          });
          return null;
        }
        return res.error || 'Signup failed';
      },

      signout: async () => {
        const token = get().token;
        if (token) await authService.signout(token);
        set({ user: null, token: null, isAuthenticated: false });
      },

      getUserFromToken: async () => {
        const token = get().token;
        if (!token) return;
        const res = await authService.getCurrentUser(token);
        if (res.user) {
          set({ user: res.user, isAuthenticated: true });
        } else {
          set({ user: null, token: null, isAuthenticated: false });
        }
      },
    }),
    {
      name: 'auth-storage', // localStorage key
    }
  )
);
