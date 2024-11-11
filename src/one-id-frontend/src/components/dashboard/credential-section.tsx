import { X, ScanFace, Fingerprint } from "lucide-react";
import { Fragment, ReactElement, useState, useRef } from "react";
import { Credential } from "@declarations/one-id-backend/one-id-backend.did";
import useCredentialStore from "@/hooks/useCredentials";

const credentialIcon: { [key: string]: JSX.Element } = {
  NIN: <img src="/icons/nin.svg" className="w-16 h-16 object-contain" />,
  FaceID: (
    <ScanFace width={1} height={1} className="w-16 h-16 brightness-200" />
  ),
  Fingerprint: (
    <Fingerprint width={1} height={1} className="w-16 h-16 brightness-200" />
  ),
  NationalPassport: (
    <img
      src="/icons/country.svg"
      className="w-16 h-16 object-contain invert-[.75]"
    />
  ),
  InternationalPassport: (
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

type CredentialsCardProps = {
  title: string;
  icon: ReactElement;
  description: string;
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
    <div
      className="cursor-pointer bg-[#121111] rounded-xl p-8 w-full border border-[#3e3e3ed6] text-center hover:bg-[#1c1a1a]"
      onClick={handleClick}
    >
      <div className="flex justify-center mb-4">{props.icon}</div>
      <h3 className="text-white font-bold text-lg mb-2 font-grotesk">
        {props.title}
      </h3>
      <p className="text-gray-400 text-sm">{props.description}</p>
    </div>
  );
};

type CredentialsModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CredentialModal: React.FC<CredentialsModalProps> = ({
  open,
  setOpen,
}) => {
  const { currentCredential, submitCredential } = useCredentialStore();
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

  const handleAddCredential = async () => {
    if (!currentCredential || !uploadedFile) return;

    // Handle credential submission here
    // You'll need to implement file upload logic and call submitCredential
  };

  return (
    <Fragment>
      <div
        className="fixed inset-0 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div className="bg-[#121111] fixed w-[35%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl p-8 border border-[#3e3e3ed6] text-center z-30">
        <button
          className="rounded-full h-8 w-8 bg-[#c3c3c385] p-1 ml-auto flex items-center justify-center mb-4 opacity-55"
          onClick={() => setOpen(false)}
        >
          <X className="text-white w-full" />
        </button>
        <div className="flex justify-center mb-4">
          {currentCredential &&
            credentialIcon[Object.keys(currentCredential.credentialType)[0]]}
        </div>
        <h3 className="text-white font-bold text-lg mb-2 font-grotesk">
          {currentCredential?.title}
        </h3>
        <h3 className="text-sm text-gray-500 w-[77%] mx-auto">
          {currentCredential?.description}
        </h3>
        <input
          className="hidden"
          type="file"
          ref={fileRef}
          onChange={handleFileUpload}
        />
        <button
          className="font-grotesk bg-gray-100 text-gray-900 text-[.75rem] px-8 py-3 rounded-[.6rem] block mt-6 mx-auto"
          onClick={handleAddFileClick}
        >
          Add Credential
        </button>
        {uploadedFile && (
          <img
            className="w-14 h-12 rounded-xl object-cover border border-gray-400 p-1 cursor-pointer mt-4"
            src={URL.createObjectURL(uploadedFile)}
            alt="Uploaded credential"
          />
        )}
      </div>
    </Fragment>
  );
};

const CredentialsSection = () => {
  const [open, setOpen] = useState(false);
  const { credentials } = useCredentialStore();

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {credentials.map((credential, index) => (
          <CredentialsCard
            key={index}
            setOpen={setOpen}
            title={credential.title}
            icon={credentialIcon[Object.keys(credential.credentialType)[0]]}
            description={credential.description}
            credential={credential}
          />
        ))}
      </div>
      {open && <CredentialModal open={open} setOpen={setOpen} />}
    </div>
  );
};

export default CredentialsSection;
