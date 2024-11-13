import { Fragment } from "react/jsx-runtime";
import { X } from "lucide-react";
import html2canvas from "html2canvas";
import { useRef } from "react";
import showToast from "@/lib/utils";
import { one_id_backend } from "@declarations/one-id-backend";
import { BackendService } from "@/services/backend";

type MintedIdCardProps = {
	principalID: string;
	setShowNFT: React.Dispatch<React.SetStateAction<boolean>>;
};

function MintedIdCard(props: MintedIdCardProps) {
	const elementRef = useRef(null);
	console.log(one_id_backend);
	const backendService = BackendService.getInstance();

	const convertToImage = async () => {
		if (!elementRef.current) return;
		showToast.loading("Converting to image...");

		try {
			// Create canvas from the React element
			const canvas = await html2canvas(elementRef.current, {
				useCORS: true, // Enable CORS for images
				scale: 2, // Increase quality
				logging: false, // Disable logging
			});

			// Convert canvas to blob
			const blob = await new Promise((resolve) => {
				canvas.toBlob(resolve, "image/png", 1.0);
			});

			// Create FormData
			const formData = new FormData();
			formData.append("images", blob as Blob, "element.png");

			// Send to backend
			const response = await fetch(
				"https://oneid-api-production.up.railway.app/api/v1/kyc/passport/upload",
				{
					method: "POST",
					body: formData,
				}
			);

			if (!response.ok) {
				showToast.error("An error occurred while uploading");
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			const minted_passport = backendService.mintDigitalPassport(
				"name",
				"description",
				"https://res.cloudinary.com/dbuaprzc0/image/upload/v1731456929/OneID/coinswag_OneID_1731456928689.png"
			);

			console.log(minted_passport);

			console.log("Upload successful:", data);
			showToast.success("Uploaded successfully");
		} catch (error) {
			showToast.error("Error converting or uploading");
			console.error("Error converting or uploading:", error);
		}
	};
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
				<div
					ref={elementRef}
					className='bg-[#121111]  rounded-xl p-2 border border-[#3e3e3ed6] z-30 nft-modal'>
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
				<button
					onClick={convertToImage}
					className='font-grotesk bg-[#cae88b] text-gray-900 text-[.75rem] px-8 py-3 mt-5 rounded-[.6rem] block mx-auto disabled:opacity-50'>
					Mint Passport
				</button>
			</div>
		</Fragment>
	);
}
export default MintedIdCard;
