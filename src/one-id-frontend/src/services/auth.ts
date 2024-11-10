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
        idleOptions: {
          disableIdle: true,
        },
      });
    }
    return this.authClient;
  }

  public async login(): Promise<Identity | undefined> {
    const days = BigInt(1);
    const hours = BigInt(24);
    const nanoseconds = BigInt(3600000000000);

    await this.authClient?.login({
      identityProvider:
        process.env.DFX_NETWORK === "ic"
          ? "https://identity.ic0.app/#authorize"
          : `http://localhost:4943?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai#authorize`,
      maxTimeToLive: days * hours * nanoseconds,
      onSuccess: () => {
        window.location.href = "/dashboard";
      },
    });

    return this.authClient?.getIdentity();
  }

  public async logout(): Promise<void> {
    await this.authClient?.logout();
    window.location.href = "/";
  }

  public async isAuthenticated(): Promise<boolean> {
    return (await this.authClient?.isAuthenticated()) || false;
  }

  public getIdentity(): Identity | undefined {
    return this.authClient?.getIdentity();
  }
}
