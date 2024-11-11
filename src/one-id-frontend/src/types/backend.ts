export type CredentialType =
  | { NIN: null }
  | { BVN: null }
  | { InternationalPassport: null }
  | { NationalPassport: null }
  | { DriversLicense: null }
  | { FaceID: null }
  | { VotersCard: null };

export type VerificationStatus =
  | { Pending: null }
  | { Verified: null }
  | { Rejected: null };

export type Credential = {
  title: string;
  imageUrl: string;
  description: string;
  credentialType: CredentialType;
  provided: boolean;
  info: Array<[string, string]>;
  verificationStatus: VerificationStatus;
  submissionTime: bigint;
  verificationTime: [] | [bigint];
  aiVerificationResult: [] | [string];
};

export type UserProfile = {
  credentials: Credential[];
  authorizedApps: AppAuthorization[];
  lastUpdated: bigint;
};

export type AppAuthorization = {
  appId: string;
  name: string;
  scopes: CredentialType[];
  authorized: boolean;
  authorizationTime: bigint;
};

export type ThirdPartyApp = {
  appId: string;
  name: string;
  description: string;
  redirectUri: string;
  clientSecret: string;
  allowedScopes: CredentialType[];
  registrationTime: bigint;
};

export type Result<T, E> = { ok: T } | { err: E };
