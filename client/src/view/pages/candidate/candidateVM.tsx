import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, userSelector } from "../../../redux/user/userSlice";

export function useCandidateVM() {
  const user = useSelector(userSelector);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  //fetch all user saved jobs -> set them to

  useEffect(() => {
    if (user._id === "") {
      fetchUserProfile()
        .then((data) => {
          dispatch(
            setUser({
              _id: data._id,
              fullName: data.userName,
              email: data.email,
              phoneNumber: data.phoneNumber,
              password: "",
              isHiring: data.isHiring,
              isCandidate: data.isCandidate,
              CV: data.CV,
              experienceOfWork: data.experienceOfWork,
            })
          );
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else {
      setIsLoggedIn(true);
    }
  }, [dispatch, user._id]);

  return { isLoggedIn };
}

export async function fetchUserProfile() {
  try {
    const response = await fetch("http://localhost:3000/api/user/profile", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const { error } = await response.json();
      console.error("Error fetching user data:", error);
      throw new Error("Failed to fetch user profile");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}
