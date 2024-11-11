import { create } from "zustand";
import { AuthService } from "@/services/auth";
import { useNavigate } from "react-router-dom";

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
      await authService.init();
      await authService.login();
      const isAuthenticated = await authService.isAuthenticated();
      set({ isAuthenticated, isLoading: false });
      if (isAuthenticated) {
        window.location.href = "/dashboard";
      }
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  logout: async () => {
    try {
      set({ isLoading: true, error: null });
      const authService = AuthService.getInstance();
      await authService.init();
      await authService.logout();
      set({ isAuthenticated: false, isLoading: false });
      window.location.href = "/";
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  checkAuth: async () => {
    try {
      set({ isLoading: true, error: null });
      const authService = AuthService.getInstance();
      await authService.init();
      const isAuthenticated = await authService.isAuthenticated();
      set({ isAuthenticated, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));
