import { useEffect } from "react";
import { useUserStore } from "@/store/user";

export const Profile = () => {
  const { profile, isLoading, error, fetchProfile } = useUserStore();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (isLoading) return <p>Loading profile...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!profile) return null;

  return (
    <div>
      <h2>Your Credentials</h2>
      {profile.credentials.map((credential, index) => (
        <div key={index}>
          <h3>{credential.title}</h3>
          <p>Type: {Object.keys(credential.credentialType)[0]}</p>
          <p>Status: {Object.keys(credential.verificationStatus)[0]}</p>
          {credential.info.map(([key, value], idx) => (
            <p key={idx}>
              {key}: {value}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};
