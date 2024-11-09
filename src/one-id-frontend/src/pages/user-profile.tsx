import CredentialsSection from "@/components/dashboard/credential-section";

function UserProfile() {
	return (
		<div className='w-[60%] mx-auto'>
			<div className='flex justify-between items-center pt-14 mb-[3rem]'>
				<div className='flex gap-3 items-center'>
					<img
						src='/icons/avatar.svg'
						alt=''
						width={10}
						height={10}
						className='w-16 h-16 rounded-full'
					/>
					<div>
						<h1 className='font-bold text-[1.3rem] font-grotesk'>
							0x61fd...1788
						</h1>
						<p className='text-gray-500 text-sm'>
							OneID passport #2912870
						</p>
					</div>
				</div>
				<button className='bg-app-primary flex justify-center items-center gap-1 px-8 py-2 text-[1rem] text-gray-800 rounded-[.6rem]'>
					<img
						src='/icons/mint.svg'
						alt=''
						width={10}
						height={10}
						className='w-[1.6rem] h-[1.6rem] rounded-full'
					/>
					Mint{" "}
				</button>
			</div>
			<CredentialsSection />
		</div>
	);
}
export default UserProfile;
