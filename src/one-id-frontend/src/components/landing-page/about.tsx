import {
	ClipboardCheck,
	Shield,
	Timer,
	LucideIcon,
	UserPlus,
} from "lucide-react";

type AboutCardProps = {
	Icon: LucideIcon;
	title: string;
	description: string;
};
const AboutCard = ({ Icon, description }: AboutCardProps) => {
	return (
		<div className='flex justify-center gap-4 border border-[#4e4e4e72] rounded-[1rem] p-4 shadow-2xl'>
			<div className='relative mb-4 inline-block'>
				<div className='absolute inset-0 bg-[#cae88b]/20 blur-xl rounded-full'></div>
				<div className='relative bg-gray-900 p-3 rounded-lg'>
					<Icon className='w-6 h-6 text-[#cae88b]' />
				</div>
			</div>
			<div>
				<p className='text-gray-500'>{description}</p>
			</div>
		</div>
	);
};

const aboutFeatures = [
	{
		icon: ClipboardCheck,
		title: "Streamlined Onboarding",
		description: "Seamless KYC reduces user friction",
	},
	{
		icon: Shield,
		title: "Enhanced Security",
		description: "Consolidated storage prevents data breaches",
	},
	{
		icon: UserPlus,
		title: "Reduced Operational Costs",
		description: "Eliminate redundant documentation and processing",
	},
	{
		icon: Timer,
		title: "Expedited Verification",
		description: "Faster KYC improves business agility",
	},
];

function About() {
	return (
		<div className='grid grid-cols-2 gap-[4rem] p-8 w-[90%] mx-auto bg-[#010101]'>
			<div className=' h-[32rem] relative w-[80%] flex justify-end flicker-1'>
				<img
					src='/icons/Fingerprint-bro.svg'
					alt='feature'
					width={900}
					height={900}
					className=' h-full   rounded-[1.2rem] w-[80%] brightness-75'
				/>
			</div>
			<div>
				<h1 className='font-grotesk text-[2.6rem] text-[#cae88b]'>
					OneID - Transforming the KYC Experience
				</h1>
				<p className='text-gray-400 mt-3'>
					Transform your business with OneIDs end-to-end KYC solutions,
					enhanced productivity, and data-driven decision-making.
				</p>

				<div className='grid grid-cols-2 gap-6 mt-10'>
					{aboutFeatures.map((feature, index) => (
						<AboutCard
							key={index}
							Icon={feature.icon}
							{...feature}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default About;
