import { useEffect, useState } from "react";
import { AuthService } from "@/services/auth";
import { Link } from "react-router-dom";

function Header() {
	const [principalId, setPrincipalId] = useState<string>("");
	const authService = AuthService.getInstance();

	useEffect(() => {
		const identity = authService.getIdentity();
		if (identity) {
			setPrincipalId(identity.getPrincipal().toString());
		}
	}, []);

	const handleLogout = async () => {
		await authService.logout();
	};

	return (
		<header className='flex items-center justify-between pt-8 gap-6'>
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
			<div className='flex items-center gap-8 text-gray-400 text-sm absolute left-1/2 -translate-x-1/2'>
				<Link to='/dashboard'>Profile</Link>
				<Link to='/dashboard/integrations'>Integrations</Link>
				<a>About</a>
				<a>Settings</a>
			</div>
			<button
				onClick={handleLogout}
				className='ml-auto bg-[#cae88b] text-gray-950 text-sm px-8 py-3 rounded-lg'>
				Sign Out
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
