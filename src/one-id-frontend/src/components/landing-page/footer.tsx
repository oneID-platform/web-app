function Footer() {
	return (
		<footer className=' w-[59%] bg-[#050505] border border-[#353535ba] mx-auto p-8 relative mt-[4rem] overflow-y-hidden rounded-t-[1.2rem]'>
			<div className='flex justify-between items-center'>
				<p className='text-gray-500 text-sm'>
					© 2024 LandFree. All rights reserved.
				</p>
				<div className='flex items-center gap-3'>
					<span>
						<img
							alt='twitter'
							src='/icons/TwitterX.svg'
							width={20}
							height={20}
						/>
					</span>
					<span>
						<img
							alt='twitter'
							src='/icons/TwitterX.svg'
							width={20}
							height={20}
						/>
					</span>
					<span>
						<img
							alt='twitter'
							src='/icons/TwitterX.svg'
							width={20}
							height={20}
						/>
					</span>
				</div>
			</div>
			<div className='  relative h-[10rem] mt-10'>
				<h1 className='text-[#606060] font-[600] opacity-20 tracking-tight text-[19rem] font-manrope text-center absolute top-[8rem] w-full  left-0 leading-[1rem]'>
					OneID
				</h1>
			</div>
		</footer>
	);
}
export default Footer;
