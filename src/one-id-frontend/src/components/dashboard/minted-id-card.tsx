import { Fragment } from "react/jsx-runtime";

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
			<div className='bg-[#121111] fixed w-[35%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl p-2 border border-[#3e3e3ed6] text-center z-30'>
				<span className='block w-full border h-[19rem]'>
					<img
						src='/icons/avatar.svg'
						alt=''
						className='w-[24rem] h-full object-cover'
					/>
				</span>
				<div>
					<h1>{props.principalID}</h1>
					<img
						src='/icons/logo.svg'
						alt=''
					/>
				</div>
			</div>
		</Fragment>
	);
}
export default MintedIdCard;
