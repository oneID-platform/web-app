import { AuthService } from "@/services/auth";
import {
	_SERVICE as OneIDPlatform,
	UserProfile,
	Credential,
	CredentialType,
} from "@declarations/one-id-backend/one-id-backend.did";
import { createActor } from "@declarations/one-id-backend";

export class BackendService {
	private static instance: BackendService;
	private actor: OneIDPlatform | null = null;

	private constructor() {}

	public static getInstance = (): BackendService => {
		if (!BackendService.instance) {
			BackendService.instance = new BackendService();
		}
		return BackendService.instance;
	};

	public async init(): Promise<void> {
		const authService = AuthService.getInstance();
		const identity = authService.getIdentity();

		if (!identity) {
			throw new Error("No identity found");
		}

		const canisterId = "bd3sg-teaaa-aaaaa-qaaba-cai";
		if (!canisterId) {
			throw new Error("Backend canister ID not found");
		}

		this.actor = createActor(canisterId, {
			agentOptions: {
				identity,
			},
		});
	}

	public getUserProfile = async (): Promise<UserProfile> => {
		if (!this.actor) {
			await this.init();
		}

		const identity = AuthService.getInstance().getIdentity();
		if (!identity) {
			throw new Error("No identity found");
		}

		const result = await this.actor?.getUserProfile(identity.getPrincipal());
		if (!result) {
			throw new Error("Failed to get user profile");
		}

		if ("err" in result) {
			throw new Error(result.err);
		}

		return result.ok;
	};

	public async initializeUser(): Promise<void> {
		if (!this.actor) {
			await this.init();
		}

		const result = await this.actor?.initializeUser()!;
		console.log(result);
		if ("err" in result) {
			throw new Error(result.err);
		}
	}

	public submitCredential = async (
		title: string,
		imageUrl: string,
		description: string,
		credentialType: CredentialType,
		info: [string, string][]
	): Promise<void> => {
		if (!this.actor) {
			await this.init();
		}

		const result = await this.actor?.submitCredential(
			title,
			imageUrl,
			description,
			credentialType,
			info
		);

		if (!result) {
			throw new Error("Failed to submit credential");
		}

		if ("err" in result) {
			throw new Error(result.err);
		}
	};

	public mintDigitalPassport = async (
		title: string,
		description: string,
		imageUrl: string
	): Promise<void> => {
		if (!this.actor) {
			await this.init();
		}

		const result = await this.actor?.mintDigitalPassport(
			title,
			description,
			imageUrl
		);
		console.log(result);

		if (!result) {
			throw new Error("Failed to mint digital passport");
		}

		if ("err" in result) {
			throw new Error(result.err);
		}
	};

	public lookupCredential = async (id: string): Promise<Credential> => {
		if (!this.actor) {
			await this.init();
		}

		const result = await this.actor?.lookup(id)!;
		if ("err" in result) {
			throw new Error(result.err);
		}
		return result.ok;
	};
}
