import {
	Network,
	Leaf,
	Users,
	TrendingUp,
	LayoutGrid,
	Scale,
	LucideIcon,
} from "lucide-react";

type FeatureCardProps = {
	Icon: LucideIcon;
	title: string;
	description: string;
};
const FeatureCard = ({ Icon, title, description }: FeatureCardProps) => (
	<div className='p-6 relative border-l border-l-gray-900 border-dashed'>
		{/* Yellow accent line */}
		<div className='absolute -translate-x-1/2 left-0 top-6 h-12 w-1 bg-[#cae88b]/70'></div>

		{/* Icon container with glow effect */}
		<div className='relative mb-4 inline-block'>
			<div className='absolute inset-0 bg-[#cae88b]/20 blur-xl rounded-full'></div>
			<div className='relative bg-gray-900 p-3 rounded-lg'>
				<Icon className='w-6 h-6 text-[#cae88b]' />
			</div>
		</div>

		{/* Content */}
		<h3 className='text-gray-200 text-xl font-semibold mb-3 font-grotesk'>
			{title}
		</h3>
		<p className='text-gray-500 text-sm leading-relaxed'>{description}</p>
	</div>
);

const Features = () => {
	const features = [
		{
			Icon: Network,
			title: "Enhanced Online Presence",
			description:
				"Stand out in the digital landscape with a professionally crafted website that captivates and engages your audience effectively.",
		},
		{
			Icon: Leaf,
			title: "Increased Brand Visibility",
			description:
				"Boost brand recognition and visibility across various online platforms, attracting more potential customers to your business.",
		},
		{
			Icon: Users,
			title: "Improved User Experience",
			description:
				"Provide visitors with seamless navigation and intuitive interfaces, ensuring a positive experience every time.",
		},
		{
			Icon: TrendingUp,
			title: "Higher Conversion Rates",
			description:
				"Convert more visitors into customers with strategically designed elements and compelling calls-to-action tailored to drive desired actions.",
		},
		{
			Icon: LayoutGrid,
			title: "Greater Accessibility",
			description:
				"Reach a wider audience and cater to diverse user needs with responsive design and accessibility features, enhancing inclusivity and user satisfaction.",
		},
		{
			Icon: Scale,
			title: "Scalability and Flexibility",
			description:
				"Adapt to evolving business needs and growth opportunities effortlessly with scalable solutions and flexible architecture tailored to your requirements.",
		},
	];

	return (
		<div className='min-h-screen bg-[#010101] p-8 pt-10 '>
			<div className='text-center'>
				<h1 className='font-grotesk text-[2.6rem] text-[#cae88b]'>
					Explore Our Key Features
				</h1>
				<p className='text-gray-300 mt-3'>
					Discover the core functionalities that make OneID the ultimate
					solution for <br /> efficient user verification.
				</p>
			</div>
			<div className='max-w-7xl mx-auto mt-12'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{features.map((feature, index) => (
						<FeatureCard
							key={index}
							Icon={feature.Icon}
							title={feature.title}
							description={feature.description}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Features;
