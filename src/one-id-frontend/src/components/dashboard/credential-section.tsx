import { useEffect } from "react";
import { ScanFace, Fingerprint } from "lucide-react";
import useCredentialStore from "@/hooks/useCredentials";

const credentialIcon: { [key: string]: JSX.Element } = {
  NIN: <img src="/icons/nin.svg" className="w-16 h-16 object-contain" />,
  FaceID: <ScanFace className="w-16 h-16 brightness-200" />,
  Fingerprint: <Fingerprint className="w-16 h-16 brightness-200" />,
  NationalPassport: (
    <img
      src="/icons/passport.svg"
      className="w-16 h-16 object-contain invert-[.75]"
    />
  ),
  DriversLicense: (
    <img
      src="/icons/driver-license.svg"
      className="w-16 h-16 object-contain invert-[.75]"
    />
  ),
};

export const CredentialsSection = () => {
  const { credentials, isLoading, error, fetchCredentials } =
    useCredentialStore();

  useEffect(() => {
    fetchCredentials();
  }, [fetchCredentials]);

  if (isLoading) return <p>Loading credentials...</p>;
  if (error) return <p>Error: {error} dalsdf</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {credentials.map((credential, index) => (
        <div
          key={index}
          className="bg-[#121111] rounded-xl p-8 border border-[#3e3e3ed6] text-center"
        >
          <div className="flex justify-center mb-4">
            {credentialIcon[Object.keys(credential.credentialType)[0]]}
          </div>
          <h3 className="text-white font-bold text-lg mb-2 font-grotesk">
            {credential.title}
          </h3>
          <p className="text-gray-400 text-sm">
            {Object.keys(credential.verificationStatus)[0]}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CredentialsSection;
