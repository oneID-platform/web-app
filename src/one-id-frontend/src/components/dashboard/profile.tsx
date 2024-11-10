import { useEffect, useState } from "react";
import { BackendService } from "@/services/backend";
import type { UserProfile } from "@/declarations/one-id-backend/actor";

export const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const backendService = BackendService.getInstance();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userProfile = await backendService.getUserProfile();
        setProfile(userProfile);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div>
      {profile ? (
        <div>
          <h2>Your Documents</h2>
          {profile.documents.map((doc, index) => (
            <div key={index}>
              <p>Type: {Object.keys(doc.documentType)[0]}</p>
              <p>Number: {doc.documentNumber}</p>
              <p>Status: {Object.keys(doc.verificationStatus)[0]}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};
