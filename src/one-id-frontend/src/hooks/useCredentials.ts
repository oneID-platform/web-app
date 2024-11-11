import { create } from "zustand";
import {
  Credential,
  CredentialType,
} from "@declarations/one-id-backend/one-id-backend.did";
import { BackendService } from "@/services/backend";

interface CredentialState {
  credentials: Credential[];
  currentCredential: Credential | null;
  isLoading: boolean;
  error: string | null;
}
interface CredentialActions {
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

export type CredentialStore = CredentialState & CredentialActions;

const useCredentialStore = create<CredentialStore>((set) => ({
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
