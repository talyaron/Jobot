import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/user/userSlice';
import { fetchUserProfile } from '../candidate/candidateVM';
import Cookies from "js-cookie";

const EmployerWrapperVM = () => {
    const [showLogin, setShowLogin] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const userCookie = Cookies.get("user");

    if (userCookie) {
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
      .catch((error:unknown) => {
        console.error("Error fetching user data:", error);
      });
    } else {
      setShowLogin(true);
    }
  }, [dispatch]); 

  return (
   { showLogin, setShowLogin}
  )
}

export default EmployerWrapperVM
