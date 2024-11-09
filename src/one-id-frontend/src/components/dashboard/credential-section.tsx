import { useState } from "react";

type CredentialsCardProps = {
	title: string;
	image: string;
	checkCredential: string;
};
const CredentialsCard: React.FC<CredentialsCardProps> = (props) => {
	return (
		<div className='bg-[#0f0e0e] rounded-xl p-8 w-full border border-[#3e3e3ed6] text-center'>
			<div className='flex justify-center mb-4'>
				<img
					src={props.image}
					alt={props.title}
					width={1}
					height={1}
					className='w-16 h-16 brightness-200'
				/>
			</div>
			<h3 className='text-white font-bold text-lg mb-2'>{props.title}</h3>
			<p className='text-gray-400 text-sm'>{props.checkCredential}</p>
		</div>
	);
};

const CredentialsSection = () => {
	const [activeTab, setActiveTab] = useState("All");

	const credentials = [
		{
			title: "Builder Score",
			image: "",
			checkCredential: "Check Credential",
			type: "Activity",
		},
		{
			title: "GitHub",
			image: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
			checkCredential: "5 stars",
			type: "Identity",
		},
		{
			title: "Base Buildathon",
			image: "",
			checkCredential: "Check Credential",
			type: "Skills",
		},
		{
			title: "/base-builds Rounds",
			image: "",
			checkCredential: "Check Credential",
			type: "Activity",
		},
		{
			title: "Base Developer",
			image: "",
			checkCredential: "Check Credential",
			type: "Identity",
		},
		{
			title: "Base Learn",
			image: "",
			checkCredential: "Check Credential",
			type: "Skills",
		},
	];

	const tabs = ["All", "Activity", "Identity", "Skills"];

	const filteredCredentials =
		activeTab === "All"
			? credentials
			: credentials.filter((credential) => credential.type === activeTab);

	return (
		<div>
			{/* <div className='flex justify-center mb-8 gap-3'>
				{tabs.map((tab, index) => (
					<button
						key={index}
						className={`px-4 py-2 rounded-lg ${
							activeTab === tab
								? "bg-gray-800 text-white"
								: "bg-gray-700 text-gray-400 hover:bg-gray-800"
						}`}
						onClick={() => setActiveTab(tab)}>
						{tab}
					</button>
				))}
			</div> */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
				{filteredCredentials.map((credential, index) => (
					<CredentialsCard
						key={index}
						title={credential.title}
						image={"/logo.svg"}
						checkCredential={credential.checkCredential}
					/>
				))}
			</div>
		</div>
	);
};

export default CredentialsSection;
