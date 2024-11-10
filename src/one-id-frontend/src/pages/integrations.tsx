type IntegrationCardProps = {
	title: string;
	image: string;
	checkCredential: string;
};

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
function IntegrationCard(props: IntegrationCardProps) {
	return (
		<div className='bg-[#121111] rounded-xl p-8 w-full border border-[#3e3e3ed6] text-center'>
			<div className='flex justify-center mb-4'>
				<img
					src={props.image}
					alt={props.title}
					width={1}
					height={1}
					className='w-16 h-16 brightness-200'
				/>
			</div>
			<h3 className='text-gray-300 font-semibold text-lg font-grotesk text-md mb-3'>
				{props.title}
			</h3>
			<button className='text-sm text-gray-950 bg-gray-300 rounded-[1rem] px-10 py-2'>
				Connect
			</button>
		</div>
	);
}

function Integrations() {
	return (
		<div className='w-[60%] mx-auto pt-14 mb-[3rem]'>
			<h1 className='text-4xl mb-2 font-grotesk'>Integrations</h1>
			<p className='text-gray-400 text-sm mb-8'>
				Add integrations with offchain platforms to earn additional
				credentials and improve your Builder Score
			</p>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
				{credentials.map((credential, index) => (
					<IntegrationCard
						key={index}
						title={credential.title}
						image={"/logo.svg"}
						checkCredential={credential.checkCredential}
					/>
				))}
			</div>
		</div>
	);
}
export default Integrations;
