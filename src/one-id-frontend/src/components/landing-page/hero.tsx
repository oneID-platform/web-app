import {
	ArrowUpRight,
	ScanFace,
	Cable,
	Key,
	Shield,
	Fingerprint,
} from "lucide-react";

function Hero() {
	return (
		<section className='h-screen relative flex justify-center items-center overflow-hidden bg-gradient-to-t from-[#0a0a0a] to-transparent to-80%'>
			<div className='absolute left-0 top-0 w-full h-screen'>
				<img
					src='https://framerusercontent.com/images/AdasGDLaknwKcCrCdo2dBx9tsk.svg'
					alt=''
					width={700}
					height={700}
					className='absolute -top-60 -left-60'
				/>
				<img
					src='https://framerusercontent.com/images/pgRXZpP6oQURLB3N19SxJxKyXY.svg'
					alt=''
					width={700}
					height={700}
					className='absolute -top-60 -right-60'
				/>
				<img
					src='https://framerusercontent.com/images/DSdxX3sp4OSZomF491zszwZzh9g.svg'
					alt=''
					width={1}
					height={1}
					className='absolute top-0 left-0 w-full brightness-125 h-[17rem]'
				/>
				<img
					src='https://framerusercontent.com/images/fX4qDtjEx58RDMEQ2paoAsRYtqI.svg'
					alt=''
					width={1000}
					height={1000}
					className='absolute bottom-0 left-0 w-full '
				/>
			</div>
			<img
				src='https://framerusercontent.com/images/0kRYx0NpOuTv0ToWN2d2VoQC5A.png'
				alt='grids'
				className='h-full w-full object-cover absolute top-0 left-0 object-top  opacity-20'
			/>
			<div className='hero--gradient h-full w-full absolute top-0 left-0' />

			<div className='z-10 text-center relative bottom-4'>
				<div className='text-sm text-gray-400 flex items-center justify-center w-fit mx-auto gap-3 bg-gray-900 pr-4 .py-2 rounded-[2.3rem] mb-3'>
					<span className='shake-bottom rounded-full bg-gray-700 w-10 h-10 flex justify-center items-center p-2 '>
						<img
							src='/icons/key-lock.svg'
							alt=''
							width={1}
							height={1}
							className='inline-block w-full'
						/>
					</span>

					<p>One Identity, Endless Possiblilites</p>
				</div>
				<h1 className='font-grotesk text-[4.1rem]  leading-[4.7rem] text-gray-200'>
					Verify Once, Use everywhere{" "}
					<img
						src='/icons/finger-print.svg'
						alt=''
						width={1}
						height={1}
						className='inline-block w-12 h-12 invert brightness-125'
					/>
				</h1>
				<p className=' text-gray-300 mt-3 leading-6 text-[1rem]'>
					Say goodbye to multiple wallets and complicated sign-ins. OneID
					provides a single, secure identity <br /> for all your
					KYC-enabled applications, making your user experience seamless
					and stress-free.
				</p>
				<div className='flex items-center justify-center gap-6 mt-10'>
					<button className='bg-[#cae88b]  px-[1.6rem] py-3  text-gray-800 text-[1.1rem] rounded-[.5rem] flex gap-1 items-center'>
						Get Started
						<span className=' rounded-full p-1 h-7 w-7 flex justify-center items-center'>
							<ArrowUpRight
								color='#000'
								className='w-full'
							/>
						</span>
					</button>
					<button className='bg-[#262626] text-[#cae88b]  px-[1.6rem] py-3 text-[1.1rem] rounded-[.5rem] flex gap-3 items-center'>
						Learn more
					</button>
				</div>
			</div>
			<div className='tag-list absolute bottom-5 left-1/2 -translate-x-1/2 '>
				<h2 className='text-center font-grotesk'>Our top Features</h2>
				<div className='loop-slider'>
					<div className='inner'>
						<div className='tag'>
							<span>
								<ScanFace color='#e8e8e8' />
							</span>
							Identity Verifciation
						</div>
						<div className='tag'>
							<span>
								<Fingerprint color='#e8e8e8' />
							</span>{" "}
							Biometric Authentication
						</div>
						<div className='tag'>
							<span>
								<Shield color='#e8e8e8' />
							</span>{" "}
							Privacy Controls
						</div>
						<div className='tag'>
							<span>
								<Key color='#e8e8e8' />
							</span>{" "}
							Access Management
						</div>
						<div className='tag'>
							<span>
								<Cable color='#e8e8e8' />
							</span>{" "}
							Cross-Platform Integration
						</div>

						<div className='tag'>
							<span>
								<ScanFace color='#e8e8e8' />
							</span>
							Identity Verifciation
						</div>
						<div className='tag'>
							<span>
								<Fingerprint color='#e8e8e8' />
							</span>{" "}
							Biometric Authentication
						</div>
						<div className='tag'>
							<span>
								<Shield color='#e8e8e8' />
							</span>{" "}
							Privacy Controls
						</div>
						<div className='tag'>
							<span>
								<Key color='#e8e8e8' />
							</span>{" "}
							Access Management
						</div>
						<div className='tag'>
							<span>
								<Cable color='#e8e8e8' />
							</span>{" "}
							Cross-Platform Integration
						</div>
					</div>
				</div>
				<div className='fade'></div>
			</div>
		</section>
	);
}
export default Hero;
