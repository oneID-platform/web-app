import { create } from "zustand";
import { UserProfile } from "@/types/backend";
import { BackendService } from "@/services/backend";

interface UserState {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  isLoading: false,
  error: null,
  fetchProfile: async () => {
    try {
      set({ isLoading: true, error: null });
      const backendService = BackendService.getInstance();
      const profile = await backendService.getUserProfile();
      set({ profile, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));
