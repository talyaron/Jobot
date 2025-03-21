import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../redux/user/userSlice";
import { fetchUserProfile } from "../candidate/candidateVM";
import { RootState } from "@reduxjs/toolkit/query";

const EmployerWrapperVM = () => {
  const [showLogin, setShowLogin] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user?._id) {
      setShowLogin(false);
      return;
    }
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
        setShowLogin(false);
      })
      .catch((error: unknown) => {
        console.error("Error fetching user data:", error);
      });
  }, [dispatch, user]);

  return { showLogin, setShowLogin };
};

export default EmployerWrapperVM;
