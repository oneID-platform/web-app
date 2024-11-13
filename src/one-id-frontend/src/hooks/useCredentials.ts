import { create } from "zustand";
import { Credential } from "@declarations/one-id-backend/one-id-backend.did";

interface CredentialState {
	credentials: Credential[];
	currentCredential: Credential | null;
}

interface CredentialActions {
	setCurrentCredential: (credential: Credential) => void;
	setCredentials: (credentials: Credential[]) => void;
}

export type CredentialStore = CredentialState & CredentialActions;

const useCredentialStore = create<CredentialStore>((set) => ({
	credentials: [],
	currentCredential: null,
	setCurrentCredential: (credential) => set({ currentCredential: credential }),
	setCredentials: (credentials) => set({ credentials }),
}));

export default useCredentialStore;
