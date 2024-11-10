import { Link } from "react-router-dom";

function Header() {
	return (
		<header className='flex items-center justify-between pt-8 gap-6'>
			<Link to='/dashboard'>
				<div className='flex gap-3 items-center'>
					<img
						src='/logo.svg'
						alt=''
						width={1}
						height={1}
						className='w-10 h-10 rounded-full invert'
					/>
					<p className='font-grotesk text-[1.6rem] font-bold'>OneID</p>
				</div>
			</Link>
			<div className='flex items-center gap-8 text-gray-400 text-sm absolute left-1/2 -translate-x-1/2'>
				<Link to='/dashboard'>Profile</Link>
				<Link to='/dashboard/integrations'>Integrations</Link>
				<Link to='/'>About</Link>
				<Link to='/'>Settings</Link>
			</div>
			<button className='ml-auto bg-[#cae88b] text-gray-950 text-sm px-8 py-3 rounded-lg'>
				Connect wallet
			</button>
			<img
				src='/icons/avatar.svg'
				alt=''
				width={10}
				height={10}
				className='w-10 h-10 rounded-full'
			/>
		</header>
	);
}
export default Header;
