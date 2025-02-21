import { UserModel } from "./userModel";

export class InfoValidator {
    regN: RegExp;
    regE: RegExp;
    regP: RegExp;
  
    constructor() {
      this.regN = /^[a-zA-Z\s'-]+$/;
      this.regE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      this.regP =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    }
 
    isNameValid(name: string) {
      if (!this.regN.test(name)) return "invalid name";
      return "";
    }
    isEmailValid=async(email: string) =>{
      const emailExist = await UserModel.findOne({ email });
      if (!this.regE.test(email) )
        return "invalid email : email needs @ and a .com ending";
      if (emailExist) return "invalid email : email already exists!";
      return "";
    }
    isPasswordValid(password: string) {
      if (!this.regP.test(password))
        return "invalid password : password requires one Uppercase letter <br> and one special letter(@#!$%#^&*)";
      return "";
    }
    isRePasswordValid(rePassword: string, password: string) {
      if (rePassword !== password)
        return "invalid repeat password: required to be the same as password";
      return "";
    }
  }
export const infoValidation: InfoValidator = new InfoValidator();
  
  