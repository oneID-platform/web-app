import CredentialsSection from "@/components/dashboard/credential-section";
import MintedIdCard from "@/components/dashboard/minted-id-card";
import { useAuthStore } from "@/hooks/useAuth";
import { BackendService } from "@/services/backend";
import { useUserStore } from "@/store/user";
import { Fragment, useCallback, useEffect, useState } from "react";

function UserProfile() {
	const { getIdentity } = useAuthStore();
	const { profile, setProfile } = useUserStore();
	const [principalId, setPrincipalId] = useState<string>("");

	const [showNFT, setShowNFT] = useState(true);

	const fetchUserProfile = useCallback(async () => {
		try {
			const backendService = BackendService.getInstance();
			backendService.initializeUser();
			const profile = await backendService.getUserProfile();
			console.log(profile);
			setProfile(profile);
		} catch (error) {}
	}, []);

	useEffect(() => {
		const identity = getIdentity();
		console.log(identity);
		if (identity) {
			setPrincipalId(identity.getPrincipal().toString());
			fetchUserProfile();
		}
	}, [getIdentity]);

	//   if (isLoading)
	//     return (
	//       <div className="flex items-center justify-center min-h-screen">
	//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-app-primary"></div>
	//       </div>
	//     );
	//   if (error)
	//     return (
	//       <div className="flex flex-col items-center justify-center min-h-screen">
	//         <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 max-w-md">
	//           <h3 className="text-red-500 font-medium text-lg mb-2">Error</h3>
	//           <p className="text-red-400/90">{error}</p>
	//         </div>
	//       </div>
	//     );

	return (
		<Fragment>
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
							<h1 className='font-bold text-[1.3rem] font-grotesk text-gray-300'>
								{principalId.slice(0, 4)}...{principalId.slice(-3)}
							</h1>
							<p className='text-gray-500 text-sm'>
								OneID passport #2912870
							</p>
						</div>
					</div>
					<button
						className='bg-app-primary flex justify-center items-center gap-1 px-8 py-2 text-[1rem] text-gray-800 rounded-[.6rem]'
						onClick={() => setShowNFT(true)}>
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
			{showNFT && (
				<MintedIdCard
					principalID={principalId}
					setShowNFT={setShowNFT}
				/>
			)}
		</Fragment>
	);
}
export default UserProfile;
