import { X, ScanFace, Fingerprint } from "lucide-react";
import { Fragment, ReactElement, useState, useRef } from "react";
import {
  Credential,
  CredentialType,
} from "@declarations/one-id-backend/one-id-backend.did";
import useCredentialStore from "@/hooks/useCredentials";
import { BackendService } from "@/services/backend";

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

const EmptyCredentialCard: React.FC<{
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  credentialType: string;
  icon: JSX.Element;
}> = ({ setOpen, credentialType, icon }) => {
  const { setCurrentCredential } = useCredentialStore();

  const handleClick = () => {
    setOpen(true);
    // Create a blank credential of this type
    const emptyCredential: Credential = {
      title: `${credentialType} Credential`,
      description: `Add your ${credentialType}`,
      credentialType: { [credentialType]: null } as unknown as CredentialType,
      verificationStatus: { Pending: null },
      info: [],
      provided: false,
      verificationTime: [BigInt(0)],
      aiVerificationResult: [],
      imageUrl: "",
      submissionTime: BigInt(0),
    };
    setCurrentCredential(emptyCredential);
  };

  return (
    <div
      className="cursor-pointer bg-[#121111] rounded-xl p-8 w-full border border-[#3e3e3ed6] text-center hover:bg-[#1c1a1a] opacity-50 hover:opacity-100"
      onClick={handleClick}
    >
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-white font-bold text-lg mb-2 font-grotesk">
        Add {credentialType}
      </h3>
      <p className="text-gray-400 text-sm">Click to add this credential</p>
    </div>
  );
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
      <div className="flex justify-center mb-4">
        {props.credential.imageUrl ? (
          <img
            src={`data:image/jpeg;base64,${props.credential.imageUrl}`}
            alt={props.title}
            className="w-16 h-16 object-cover rounded-lg"
          />
        ) : (
          props.icon
        )}
      </div>
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
  const { currentCredential, setCredentials } = useCredentialStore();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const backendService = BackendService.getInstance();

  const handleAddFileClick = () => {
    fileRef.current?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setUploadedFile(files[0]);
      setError(null);
    }
  };

  const handleAddCredential = async () => {
    if (!currentCredential || !uploadedFile) {
      setError("Please upload a file for the credential");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // Convert file to base64 string
      const base64String = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result as string;
          resolve(base64.split(",")[1]); // Remove data URL prefix
        };
        reader.readAsDataURL(uploadedFile);
      });

      // Submit credential with file data
      await backendService.submitCredential(
        currentCredential.title,
        base64String, // Use base64 string as imageUrl
        currentCredential.description,
        currentCredential.credentialType,
        currentCredential.info
      );

      // Refresh credentials list
      const userProfile = await backendService.getUserProfile();
      setCredentials(userProfile.credentials);

      // Close modal and reset state
      setOpen(false);
      setUploadedFile(undefined);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add this to show existing image
  const existingImage = currentCredential?.imageUrl ? (
    <img
      className="w-24 h-24 rounded-xl object-cover border border-gray-400 p-1 mx-auto mb-4"
      src={`data:image/jpeg;base64,${currentCredential.imageUrl}`}
      alt="Existing credential"
    />
  ) : null;

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
          accept="image/*"
          ref={fileRef}
          onChange={handleFileUpload}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div className="mt-6 space-y-4">
          {uploadedFile ? (
            <>
              <img
                className="w-24 h-24 rounded-xl object-cover border border-gray-400 p-1 mx-auto"
                src={URL.createObjectURL(uploadedFile)}
                alt="Uploaded credential"
              />
              <button
                className="font-grotesk bg-[#cae88b] text-gray-900 text-[.75rem] px-8 py-3 rounded-[.6rem] block mx-auto disabled:opacity-50"
                onClick={handleAddCredential}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Credential"}
              </button>
            </>
          ) : (
            <>
              {existingImage}
              <button
                className="font-grotesk bg-gray-100 text-gray-900 text-[.75rem] px-8 py-3 rounded-[.6rem] block mx-auto"
                onClick={handleAddFileClick}
              >
                {currentCredential?.imageUrl ? "Change Image" : "Upload Image"}
              </button>
            </>
          )}
        </div>
      </div>
    </Fragment>
  );
};

const CredentialsSection = () => {
  const [open, setOpen] = useState(false);
  const { credentials } = useCredentialStore();

  // Get all existing credential types
  const existingTypes = credentials.map(
    (cred) => Object.keys(cred.credentialType)[0]
  );

  // Get all available credential types
  const availableTypes = Object.keys(credentialIcon);

  // Filter out types that haven't been added yet
  const missingTypes = availableTypes.filter(
    (type) => !existingTypes.includes(type)
  );

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
        {missingTypes.map((type) => (
          <EmptyCredentialCard
            key={type}
            setOpen={setOpen}
            credentialType={type}
            icon={credentialIcon[type]}
          />
        ))}
      </div>
      {open && <CredentialModal open={open} setOpen={setOpen} />}
    </div>
  );
};

export default CredentialsSection;
