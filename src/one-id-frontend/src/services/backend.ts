import { AuthService } from "@/services/auth";
import {
  init,
  _SERVICE as OneIDPlatform,
} from "@declarations/one-id-backend/one-id-backend.did";
import { createActor } from "@declarations/one-id-backend";
import { Principal } from "@dfinity/principal";

export class BackendService {
  private static instance: BackendService;
  private actor: OneIDPlatform | null = null;

  private constructor() {}

  public static getInstance(): BackendService {
    if (!BackendService.instance) {
      BackendService.instance = new BackendService();
    }
    return BackendService.instance;
  }

  public async init(): Promise<void> {
    const authService = AuthService.getInstance();
    const identity = authService.getIdentity();

    if (!identity) {
      throw new Error("No identity found");
    }

    const canisterId = process.env.NEXT_PUBLIC_BACKEND_CANISTER_ID;
    if (!canisterId) {
      throw new Error("Backend canister ID not found in environment variables");
    }

    this.actor = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });
  }

  public getActor(): OneIDPlatform {
    if (!this.actor) {
      throw new Error("Backend service not initialized");
    }
    return this.actor;
  }
}
