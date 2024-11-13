type IntegrationCardProps = {
	name: string;
	description: string;
	redirectUri: string;
	requiredCredentials: string[];
	image?: string;
};

const integrations = {
	fintech_apps: {
		kuda: {
			name: "Kuda Bank",
			description: "Digital Banking Platform",
			redirectUri: "https://kuda.com/verify",
			requiredCredentials: ["NIN", "BVN", "FaceID"],
			image: "/icons/kuda.svg",
		},
		opay: {
			name: "OPay",
			description: "Digital Payment Platform",
			redirectUri: "https://opay.com/verify",
			requiredCredentials: ["NIN", "BVN"],
			image: "/icons/opay.svg",
		},
		palmpay: {
			name: "PalmPay",
			description: "Digital Payment Platform",
			redirectUri: "https://palmpay.com/verify",
			requiredCredentials: ["NIN", "BVN"],
			image: "/icons/palmpay.svg",
		},
	},
	crypto_exchanges: {
		binance: {
			name: "Binance Nigeria",
			description: "Cryptocurrency Exchange",
			redirectUri: "https://binance.com/ng/verify",
			requiredCredentials: ["NIN", "BVN", "InternationalPassport"],
			image: "/icons/binance.svg",
		},
		quidax: {
			name: "Quidax",
			description: "Nigerian Crypto Exchange",
			redirectUri: "https://quidax.com/verify",
			requiredCredentials: ["NIN", "BVN"],
			image: "/icons/quidax.svg",
		},
	},
};

function IntegrationCard({
	name,
	description,
	requiredCredentials,
	image,
}: IntegrationCardProps) {
	return (
		<div className='bg-[#121111] rounded-xl p-8 w-full border border-[#3e3e3ed6] text-center'>
			<div className='flex justify-center mb-4'>
				{image && (
					<img
						src={image}
						alt={name}
						className='w-16 h-16 object-contain'
					/>
				)}
			</div>
			<h3 className='text-gray-300 font-semibold text-lg font-grotesk mb-2'>
				{name}
			</h3>
			<p className='text-gray-400 text-sm mb-4'>{description}</p>
			<div className='flex flex-wrap gap-2 justify-center mb-4'>
				{requiredCredentials.map((cred) => (
					<span
						key={cred}
						className='text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded'>
						{cred}
					</span>
				))}
			</div>
			<button className='text-sm text-gray-950 bg-gray-300 rounded-[1rem] px-10 py-2 hover:bg-gray-400 transition-colors'>
				Connect
			</button>
		</div>
	);
}

function Integrations() {
	const allIntegrations = Object.values(integrations).flatMap((category) =>
		Object.values(category)
	);

	return (
		<div className='w-[60%] mx-auto pt-14 mb-[3rem]'>
			<h1 className='text-4xl mb-2 font-grotesk'>Integrations</h1>
			<p className='text-gray-400 text-sm mb-8'>
				Add integrations with offchain platforms to earn additional
				credentials and improve your Builder Score
			</p>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
				{allIntegrations.map((integration, index) => (
					<IntegrationCard
						key={index}
						{...integration}
					/>
				))}
			</div>
		</div>
	);
}

export default Integrations;
