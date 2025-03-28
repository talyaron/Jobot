import React from "react";
import { useUserProfileVM } from "./userProfileVM";

const UserProfile: React.FC = () => {
  const { userProfile, loading, error } = useUserProfileVM();

  if (loading) return <p>loading...</p>;
  if (error) return <p>{error}</p>;
  if (!userProfile) return <p>No user data available</p>;

  return (
    <div>
      <h2>פרופיל משתמש</h2>
      <p><strong>שם מלא:</strong> {userProfile.fullName}</p>
      <p><strong>אימייל:</strong> {userProfile.email}</p>
      <p><strong>מס' טלפון:</strong> {userProfile.phoneNumber}</p>
    </div>
  );
};

export default UserProfile;
