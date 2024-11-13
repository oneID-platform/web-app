import { BackendService } from "./backend";
import { UserProfile } from "@declarations/one-id-backend/one-id-backend.did";

class UserService {
  private static instance: UserService;
  private backendService: BackendService;
  private initialized: boolean = false;

  private constructor() {
    this.backendService = BackendService.getInstance();
  }

  public static getInstance = (): UserService => {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  };

  public initializeUser = async (): Promise<void> => {
    if (this.initialized) return;
    await this.backendService.initializeUser();
    this.initialized = true;
  };

  public getUserProfile = async (): Promise<UserProfile> => {
    if (!this.initialized) {
      await this.initializeUser();
    }
    return await this.backendService.getUserProfile();
  };

  public resetInitialization(): void {
    this.initialized = false;
  }
}

export default UserService;
