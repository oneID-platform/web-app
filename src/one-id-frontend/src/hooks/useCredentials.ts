import { create } from "zustand";

const credentials: Credential[] = [
	{
		title: "Face ID",
		imageUrl: "",
		icon: "faceid",
		type: "Skill certifications",
		description: "",
		provided: true,
		info: {
			"Skill Level": "Expert",
			"Certification Authority": "Apple",
			"Certification Date": "2021-09-12",
			"Expiration Date": "2023-09-12",
		},
	},
	{
		title: "NIN",
		imageUrl: "",
		icon: "nin",
		type: "ID documents",
		description: "",
		provided: true,
		info: {
			"Skill Level": "Expert",
			"Certification Authority": "Apple",
			"Certification Date": "2021-09-12",
			"Expiration Date": "2023-09-12",
		},
	},
	{
		title: "Finger Print",
		imageUrl: "",
		icon: "fingerprint",
		type: "Access authorizations",
		description: "",
		provided: true,
		info: {
			"Skill Level": "Expert",
			"Certification Authority": "Apple",
			"Certification Date": "2021-09-12",
			"Expiration Date": "2023-09-12",
		},
	},
	{
		title: "Nationa ID",
		imageUrl: "",
		icon: "national-id",
		type: "ID documents",
		description: "",
		provided: true,
		info: {
			"Skill Level": "Expert",
			"Certification Authority": "Apple",
			"Certification Date": "2021-09-12",
			"Expiration Date": "2023-09-12",
		},
	},
	{
		title: "Passport",
		imageUrl: "",
		icon: "passport",
		type: "ID documents",
		description: "",
		provided: true,
		info: {
			"Skill Level": "Expert",
			"Certification Authority": "Apple",
			"Certification Date": "2021-09-12",
			"Expiration Date": "2023-09-12",
		},
	},
	{
		title: "Driver License",
		icon: "driver-license",
		imageUrl: "",
		type: "Skill certifications",
		description: "",
		provided: true,
		info: {
			"Skill Level": "Expert",
			"Certification Authority": "Apple",
			"Certification Date": "2021-09-12",
			"Expiration Date": "2023-09-12",
		},
	},
];

type CredentialType =
	| "Degrees, Diplomas"
	| "Occupation licenses"
	| "Skill certifications"
	| "Online badges"
	| "ID documents"
	| "Access authorizations"
	| "Professional memberships";

export type Credential = {
	title: string;
	imageUrl: string;
	description: string;
	type: CredentialType;
	icon: string;
	provided: boolean;
	info: {
		[key: string]: string;
	};
};
interface CredentialState {
	credentials: Credential[];
	currentCredential: Credential | null;
	setCurrentCredential: (credential: Credential) => void;
}

const useCredentialStore = create<CredentialState>((set) => ({
	credentials: credentials,
	currentCredential: null,
	setCurrentCredential: (credential) => {
		set(() => {
			return {
				currentCredential: credential,
			};
		});
	},
}));

export default useCredentialStore;
