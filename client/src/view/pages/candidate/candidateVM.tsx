import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/user/userSlice";


export async function fetchUserProfile() {
  try {
    const response = await fetch("http://localhost:3000/api/user/profile", {
      method: "GET",
      credentials: "include", 
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }

    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error; 
  }
}


export function useCandidateVM() {
  const [showLogin, setShowLogin] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const userCookie = Cookies.get("user");

    if (userCookie) {
      fetchUserProfile()
      .then((data) => {
        dispatch(setUser({
          fullName: data.userName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          password: '',
          isHiring: data.isHiring,
          isCandidate: data.isCandidate,
          CV: data.CV,
          experienceOfWork: data.experienceOfWork,
        }));
        setShowLogin(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
    } else {
      setShowLogin(true);
    }
  }, [dispatch]); 

  return { showLogin, setShowLogin };
}
