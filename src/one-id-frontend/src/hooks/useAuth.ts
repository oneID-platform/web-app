import { create } from "zustand";
import { AuthService } from "@/services/auth";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isLoading: false,
  error: null,
  login: async () => {
    try {
      set({ isLoading: true, error: null });
      const authService = AuthService.getInstance();
      await authService.login();
      set({ isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  logout: async () => {
    try {
      set({ isLoading: true, error: null });
      const authService = AuthService.getInstance();
      await authService.logout();
      set({ isAuthenticated: false, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  checkAuth: async () => {
    try {
      set({ isLoading: true, error: null });
      const authService = AuthService.getInstance();
      await authService.init();
      set({
        isAuthenticated: await authService.isAuthenticated(),
        isLoading: false,
      });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));
