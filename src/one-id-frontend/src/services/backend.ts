import { AuthService } from "./auth";
import { _SERVICE as OneIDPlatform } from "@declarations/one-id-backend/one-id-backend.did";
import { createActor } from "@declarations/one-id-backend";
import {
  CredentialType,
  UserProfile,
  Credential,
  VerificationStatus,
  ThirdPartyApp,
  AppAuthorization,
  Result,
} from "@/types/backend";
import { Principal } from "@dfinity/principal";

export class BackendService {
  private static instance: BackendService;
  private backend: OneIDPlatform | null = null;
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
    if (!identity) throw new Error("Not authenticated");

    this.backend = createActor(process.env.CANISTER_ID_ONE_ID_BACKEND!, {
      agentOptions: {
        identity,
      },
    });
  }

  private mapCredentialType(type: any): CredentialType {
    const key = Object.keys(type)[0];
    return { [key]: null } as CredentialType;
  }

  private mapVerificationStatus(status: any): VerificationStatus {
    const key = Object.keys(status)[0];
    return { [key]: null } as VerificationStatus;
  }

  private mapBackendProfile(backendProfile: any): UserProfile {
    return {
      credentials: backendProfile.credentials.map((cred: any) => ({
        title: cred.title,
        imageUrl: cred.imageUrl,
        description: cred.description,
        credentialType: this.mapCredentialType(cred.credentialType),
        provided: cred.provided,
        info: cred.info,
        verificationStatus: this.mapVerificationStatus(cred.verificationStatus),
        submissionTime: cred.submissionTime,
        verificationTime: cred.verificationTime,
        aiVerificationResult: cred.aiVerificationResult,
      })),
      authorizedApps: backendProfile.authorizedApps.map((app: any) => ({
        appId: app.appId,
        name: app.name,
        scopes: app.scopes.map(this.mapCredentialType),
        authorized: app.authorized,
        authorizationTime: app.authorizationTime,
      })),
      lastUpdated: backendProfile.lastUpdated,
    };
  }

  public async initializeUser(): Promise<UserProfile> {
    if (!this.backend) await this.init();
    const result = await this.backend!.initializeUser();
    if ("err" in result) throw new Error(result.err);
    return this.mapBackendProfile(result.ok);
  }

  public async submitCredential(
    title: string,
    imageUrl: string,
    description: string,
    credentialType: CredentialType,
    info: [string, string][]
  ): Promise<Credential> {
    if (!this.backend) await this.init();
    const result = await this.backend!.submitCredential(
      title,
      imageUrl,
      description,
      credentialType,
      info
    );
    if ("err" in result) throw new Error(result.err);
    return {
      title: result.ok.title,
      imageUrl: result.ok.imageUrl,
      description: result.ok.description,
      credentialType: result.ok.credentialType,
      provided: result.ok.provided,
      info: result.ok.info,
      verificationStatus: result.ok.verificationStatus,
      submissionTime: result.ok.submissionTime,
      verificationTime: result.ok.verificationTime,
      aiVerificationResult: result.ok.aiVerificationResult,
    };
  }

  public async getUserProfile(): Promise<UserProfile> {
    if (!this.backend) await this.init();
    const identity = this.authService.getIdentity();
    if (!identity) throw new Error("Not authenticated");

    const result = await this.backend!.getUserProfile(identity.getPrincipal());
    if ("err" in result) throw new Error(result.err);
    return this.mapBackendProfile(result.ok);
  }

  public async authorizeApp(
    appId: string,
    scopes: CredentialType[]
  ): Promise<void> {
    if (!this.backend) await this.init();
    const result = await this.backend!.authorizeApp(appId, scopes);
    if ("err" in result) throw new Error(result.err);
  }

  public async lookupCredential(id: string): Promise<Credential> {
    if (!this.backend) await this.init();
    const result = await this.backend!.lookup(id);
    if ("err" in result) throw new Error(result.err);

    // Map the backend credential to our frontend type
    const credential = result.ok;
    return {
      title: credential.title,
      imageUrl: credential.imageUrl,
      description: credential.description,
      credentialType: this.mapCredentialType(credential.credentialType),
      provided: credential.provided,
      info: credential.info,
      verificationStatus: this.mapVerificationStatus(
        credential.verificationStatus
      ),
      submissionTime: credential.submissionTime,
      verificationTime: credential.verificationTime,
      aiVerificationResult: credential.aiVerificationResult,
    };
  }

  public async getAppDetails(appId: string): Promise<ThirdPartyApp> {
    if (!this.backend) await this.init();
    const result = await this.backend!.getAppDetails(appId);
    if ("err" in result) throw new Error(result.err);
    return result.ok;
  }

  public async getAuthorizedCredentials(
    user: Principal,
    appId: string
  ): Promise<Credential[]> {
    if (!this.backend) await this.init();
    const result = await this.backend!.getAuthorizedCredentials(user, appId);
    if ("err" in result) throw new Error(result.err);
    return result.ok;
  }

  public async registerApp(
    appId: string,
    name: string,
    description: string,
    redirectUri: string,
    allowedScopes: CredentialType[]
  ): Promise<ThirdPartyApp> {
    if (!this.backend) await this.init();
    const result = await this.backend!.registerApp(
      appId,
      name,
      description,
      redirectUri,
      allowedScopes
    );
    if ("err" in result) throw new Error(result.err);
    return result.ok;
  }
}
