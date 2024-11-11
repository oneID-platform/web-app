import { create } from "zustand";
import { BackendService } from "@/services/backend";
import { Credential, CredentialType } from "@/types/backend";

interface CredentialState {
  credentials: Credential[];
  currentCredential: Credential | null;
  isLoading: boolean;
  error: string | null;
  setCurrentCredential: (credential: Credential) => void;
  fetchCredentials: () => Promise<void>;
  submitCredential: (
    title: string,
    imageUrl: string,
    description: string,
    credentialType: CredentialType,
    info: [string, string][]
  ) => Promise<void>;
}

const useCredentialStore = create<CredentialState>((set) => ({
  credentials: [],
  currentCredential: null,
  isLoading: false,
  error: null,
  setCurrentCredential: (credential) => set({ currentCredential: credential }),
  fetchCredentials: async () => {
    try {
      set({ isLoading: true, error: null });
      const backendService = BackendService.getInstance();
      const profile = await backendService.getUserProfile();
      set({ credentials: profile.credentials, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  submitCredential: async (
    title,
    imageUrl,
    description,
    credentialType,
    info
  ) => {
    try {
      set({ isLoading: true, error: null });
      const backendService = BackendService.getInstance();
      await backendService.submitCredential(
        title,
        imageUrl,
        description,
        credentialType,
        info
      );
      const profile = await backendService.getUserProfile();
      set({ credentials: profile.credentials, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));

export default useCredentialStore;
