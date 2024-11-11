import { AuthClient } from "@dfinity/auth-client";
import { Identity } from "@dfinity/agent";

export class AuthService {
  private static instance: AuthService;
  private authClient: AuthClient | null = null;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async init(): Promise<AuthClient> {
    if (!this.authClient) {
      this.authClient = await AuthClient.create({
        idleOptions: { disableIdle: true },
      });
    }
    return this.authClient;
  }

  public async login(): Promise<void> {
    if (!this.authClient) {
      await this.init();
    }

    const days = BigInt(1);
    const hours = BigInt(24);
    const nanoseconds = BigInt(3600000000000);

    return new Promise<void>((resolve, reject) => {
      this.authClient?.login({
        identityProvider:
          process.env.DFX_NETWORK === "ic"
            ? "https://identity.ic0.app/#authorize"
            : `http://br5f7-7uaaa-aaaaa-qaaca-cai.localhost:4943/#authorize`,
        maxTimeToLive: days * hours * nanoseconds,
        onSuccess: resolve,
        onError: reject,
      });
    });
  }

  public async logout(): Promise<void> {
    if (!this.authClient) {
      await this.init();
    }
    await this.authClient?.logout();
  }

  public async isAuthenticated(): Promise<boolean> {
    if (!this.authClient) {
      await this.init();
    }
    return (await this.authClient?.isAuthenticated()) || false;
  }

  public getIdentity(): Identity | undefined {
    return this.authClient?.getIdentity();
  }
}
