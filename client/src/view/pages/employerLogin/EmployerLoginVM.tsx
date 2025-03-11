import { useEffect, useState } from "react";
import { useDispatch, } from "react-redux";
import { useNavigate } from "react-router";
import { setUser, } from "../../../redux/user/userSlice";

export const EmployerLoginVM = () => {
 const [isLogin, setIsLogin] = useState(true);
 const [userLoggedIn, setUserLoggedIn] = useState(false);

    const [formData, setFormData] = useState({
      userName: "",
      email: "",
      password: "",
      rePassword: "",
      phoneNumber: "",
      isHiring:true
    });
    const navigate = useNavigate(); // Initialize the navigate function
    const dispatch = useDispatch();
  // Use useEffect to navigate when showLogin is true
  useEffect(() => {
    if (userLoggedIn) {
      navigate('/employer/');
    }
  }, [userLoggedIn, navigate]); 
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const endpoint = isLogin ? "http://localhost:3000/api/auth/login" : "http://localhost:3000/api/auth/register";    
        const data = isLogin ? { email: formData.email, password: formData.password ,phoneNumber:formData.phoneNumber , isHiring:true }: formData;
        
        console.log(data)
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        });

        const result = await response.json();
        if(isLogin){
          setUserLoggedIn(true)
          dispatch(setUser(result.user));
        }
        
        if (!response.ok) throw new Error(result.message || "An error occurred");
        alert(result.message);
      } catch (error: unknown) {
        alert(error instanceof Error ? error.message : "An error occurred");
      }
    };

    return {handleChange, handleSubmit, isLogin, formData, setIsLogin}
}

