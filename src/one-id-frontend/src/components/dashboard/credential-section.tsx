import { LucideIcon, X, ScanFace, Fingerprint } from "lucide-react";
import { Fragment, ReactElement, useState, useRef } from "react";

import useCredentialStore, { Credential } from "@/hooks/useCredentials";

const credentialIcon: { [key: string]: JSX.Element } = {
	nin: (
		<img
			src='/icons/nin.svg'
			className='w-16 h-16 object-contain'
		/>
	),
	faceid: (
		<ScanFace
			width={1}
			height={1}
			className='w-16 h-16 brightness-200'
		/>
	),
	fingerprint: (
		<Fingerprint
			width={1}
			height={1}
			className='w-16 h-16 brightness-200'
		/>
	),
	"national-id": (
		<img
			src='/icons/country.svg'
			className='w-16 h-16 object-contain invert-[.75]'
		/>
	),
	passport: (
		<img
			src='/icons/passport.svg'
			className='w-16 h-16 object-contain invert-[.75]'
		/>
	),
	"driver-license": (
		<img
			src='/icons/driver-license.svg'
			className='w-16 h-16 object-contain invert-[.75]'
		/>
	),
};

type CredentialsCardProps = {
	title: string;
	icon: ReactElement;
	checkCredential: string;
	credential: Credential;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CredentialsCard: React.FC<CredentialsCardProps> = (props) => {
	const { setCurrentCredential } = useCredentialStore();

	const handleClick = () => {
		props.setOpen(true);
		setCurrentCredential(props.credential);
	};
	return (
		<Fragment>
			<div
				className='cursor-pointer bg-[#121111] rounded-xl p-8 w-full border border-[#3e3e3ed6] text-center hover:bg-[#1c1a1a]'
				onClick={handleClick}>
				<div className='flex justify-center mb-4'>{props.icon}</div>
				<h3 className='text-white font-bold text-lg mb-2 font-grotesk'>
					{props.title}
				</h3>
				<p className='text-gray-400 text-sm'>{props.checkCredential}</p>
			</div>
		</Fragment>
	);
};

type CredentialsModalProps = {
	title: string;
	Icon: LucideIcon;
	open: boolean;
	description: string;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CrendentialModal: React.FC<CredentialsModalProps> = (props) => {
	const { currentCredential } = useCredentialStore();
	const fileRef = useRef<HTMLInputElement>(null);
	const [uploadedFile, setUploadedFile] = useState<File>();

	const handleAddFileClick = () => {
		fileRef.current?.click();
	};

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files) {
			setUploadedFile(files[0]);
		}
	};

	const handleAddCredential = () => {};
	return (
		<Fragment>
			<div
				className={`fixed left-0 top-0 backdrop-blur-sm  h-full w-full `}
				onClick={() => props.setOpen(false)}
			/>
			<div
				className={`bg-[#121111] fixed w-[35%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl p-8  border border-[#3e3e3ed6] text-center z-30`}>
				<button
					className='rounded-full h-8 w-8 bg-[#c3c3c385] p-1 ml-auto flex items-center justify-center mb-4 opacity-55'
					onClick={() => props.setOpen(false)}>
					<X className='text-white w-full' />
				</button>
				<div className='flex justify-center mb-4'>
					{credentialIcon[currentCredential?.icon!]}
				</div>
				<h3 className='text-white font-bold text-lg mb-2 font-grotesk'>
					{currentCredential?.title}
				</h3>

				<h3 className='text-sm text-gray-500  w-[77%] mx-auto'>
					This credential is used to identify if one has been registed in
					the countries registry or had been assigned a number
				</h3>
				<input
					className='hidden'
					type='file'
					name=''
					id=''
					ref={fileRef}
					onChange={handleFileUpload}
				/>
				<button
					className='font-grotesk bg-gray-100 text-gray-900 text-[.75rem] px-8 py-3 rounded-[.6rem] block mt-6 mx-auto'
					onClick={handleAddFileClick}>
					Add Credential
				</button>
				{uploadedFile && (
					<img
						className='w-14 h-12 rounded-xl object-cover border border-gray-400 p-1 cursor-pointer '
						src={URL.createObjectURL(uploadedFile!)}
						alt=''
					/>
				)}
				<div></div>
			</div>
		</Fragment>
	);
};

const CredentialsSection = () => {
	const [open, setOpen] = useState(false);
	const { credentials } = useCredentialStore();

	return (
		<div>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
				{credentials.map((credential, index) => (
					<CredentialsCard
						key={index}
						setOpen={setOpen}
						title={credential.title}
						icon={credentialIcon[credential.icon]}
						checkCredential={credential.type}
						credential={credential}
					/>
				))}
			</div>
			{open && (
				<CrendentialModal
					setOpen={setOpen}
					open={open}
					Icon={ScanFace}
					title='Your NIN'
					description='An identity number that identifys your citenship'
				/>
			)}
		</div>
	);
};

export default CredentialsSection;
