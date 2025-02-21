import { useState } from 'react'

export function useAuthVM() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
      userName: "",
      email: "",
      password: "",
      rePassword: "",
      phoneNumber: "",
    });
  
    const handleChange = (e: any) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e: any) => {
      e.preventDefault();
      try {
        const endpoint = isLogin ? "http://localhost:3000/api/auth/login" : "http://localhost:3000/api/auth/register";    
        const data = isLogin ? { email: formData.email, password: formData.password }: formData;
        
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        });
        
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "An error occurred");
        alert(result.message);
      } catch (error: any) {
        alert(error.message);
      }
    };

    return {handleChange, handleSubmit, isLogin, formData, setFormData, setIsLogin}
}
