import { Fragment } from "react/jsx-runtime";
import { X } from "lucide-react";

type MintedIdCardProps = {
	principalID: string;
	setShowNFT: React.Dispatch<React.SetStateAction<boolean>>;
};

function MintedIdCard(props: MintedIdCardProps) {
	return (
		<Fragment>
			<div
				className='fixed inset-0 backdrop-blur-sm'
				onClick={() => props.setShowNFT(false)}
			/>
			<div className='fixed w-[25%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#161616] px-8 py-8 rounded-2xl border border-[#3e3e3ed6]'>
				<button
					className='rounded-full h-8 w-8 bg-[#c3c3c385] p-1 ml-auto flex items-center justify-center mb-4 opacity-55'
					onClick={() => props.setShowNFT(false)}>
					<X className='text-white w-full' />
				</button>
				<div className='bg-[#121111]  rounded-xl p-2 border border-[#3e3e3ed6] z-30 nft-modal'>
					<span className='block w-full h-[16rem] nft-card'></span>
					<div className='h-[4.5rem] bg-[#1f1f20] flex justify-between items-center px-4'>
						<div>
							<h1 className='font-grotesk text-[1.1rem] text-gray-400 text-right'>
								{props.principalID.slice(0, 4)}...
								{props.principalID.slice(-3)}
							</h1>
							<p className='text-sm text-gray-700 font-quicksand'>
								OneID
							</p>
						</div>
						<img
							src='/logo.svg'
							alt=''
							className='invert-[.8] w-6'
						/>
					</div>
				</div>
				<button className='font-grotesk bg-[#cae88b] text-gray-900 text-[.75rem] px-8 py-3 mt-5 rounded-[.6rem] block mx-auto disabled:opacity-50'>
					Mint Passport
				</button>
			</div>
		</Fragment>
	);
}
export default MintedIdCard;
