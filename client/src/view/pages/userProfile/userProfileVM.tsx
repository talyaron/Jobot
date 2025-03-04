import { useEffect, useState } from "react";
import { UserProfile } from "../../../model/userProfile";

export const useUserProfileVM = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/profile", {
          method: "GET",
          credentials: "include", 
        });
       

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data: UserProfile = await response.json();
        setUserProfile(data);
      } catch (err) {
        setError("Error loading user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return { userProfile, loading, error };
};