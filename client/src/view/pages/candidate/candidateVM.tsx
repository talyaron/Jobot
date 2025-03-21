import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, userSelector } from "../../../redux/user/userSlice";


export async function fetchUserProfile() {
  try {
    console.log("fetchUserProfile", fetchUserProfile)
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
  const user = useSelector(userSelector);
  const [showLogin, setShowLogin] = useState(false);
  const dispatch = useDispatch();


  //fetch all user saved jobs -> set them to redux

  useEffect(() => {


    if (user._id !== "") {
      fetchUserProfile()
      .then((data) => {
        console.log(data)
        dispatch(setUser({
          _id: data._id,
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
  }, [dispatch, user._id]); 

  return { showLogin, setShowLogin };
}
