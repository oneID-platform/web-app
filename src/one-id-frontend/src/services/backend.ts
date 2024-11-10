import { AuthService } from "./auth";
import { OneIDBackend } from "@/declarations/one-id-backend/actor";

export class BackendService {
  private static instance: BackendService;
  private backend: OneIDBackend | null = null;
  private authService: AuthService;

  private constructor() {
    this.authService = AuthService.getInstance();
  }

  public static getInstance(): BackendService {
    if (!BackendService.instance) {
      BackendService.instance = new BackendService();
    }
    return BackendService.instance;
  }

  public async init(): Promise<void> {
    const identity = this.authService.getIdentity();
    this.backend = new OneIDBackend(identity);
  }

  public async initializeUser() {
    if (!this.backend) await this.init();
    return await this.backend!.initializeUser();
  }

  public async submitDocument(
    docType: any,
    documentNumber: string,
    imageHash?: string
  ) {
    if (!this.backend) await this.init();
    return await this.backend!.submitDocument(
      docType,
      documentNumber,
      imageHash
    );
  }

  public async getUserProfile() {
    if (!this.backend) await this.init();
    const identity = this.authService.getIdentity();
    if (!identity) throw new Error("Not authenticated");
    return await this.backend!.getUserProfile(identity.getPrincipal());
  }
}
