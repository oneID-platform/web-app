import { useUserStore } from "@/store/user";

export const Profile = () => {
  const { profile } = useUserStore();

  // return <div>Hello</div>;
  return (
    <div>
      <h2>Your Credentials</h2>
      {profile?.credentials.map((credential, index) => (
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
