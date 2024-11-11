import { create } from "zustand";
import { UserProfile } from "@declarations/one-id-backend/one-id-backend.did";

interface UserState {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
}));
