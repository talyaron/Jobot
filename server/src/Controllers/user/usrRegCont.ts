import { infoValidation } from "../../Model/utils/validatorModel";
import { UserModel } from "../../Model/userModel";
import bcrypt from "bcrypt";
import { saltRounds } from "../../server";

export async function registerUser(req: any, res: any) {
  try {
    const { userName, email, password, rePassword ,phoneNumber } = req.body;

    const existingUser = await UserModel.findOne({ email });   // to check if email already exists
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // const invalidUsername = infoValidation.isNameValid(userName);
    // const invalidEmail = await infoValidation.isEmailValid(email);
    // const invalidPassword = infoValidation.isPasswordValid(password);
    // const invalidRePassword = infoValidation.isRePasswordValid(
    //   rePassword,
    //   password
    // );


    // if (
    //   invalidUsername ||
    //   invalidEmail ||
    //   invalidPassword ||
    //   invalidRePassword
    // ) {
    //   throw new Error(
    //     "not valid" +
    //       invalidUsername +
    //       invalidEmail +
    //       invalidPassword +
    //       invalidRePassword
    //   );
    // }


    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new UserModel({
      userName: userName,
      email: email,
      password: hashedPassword,
      phone:phoneNumber,
    });
    await user.validate();

    user.save();

    return res.json({ message: "user registered!" });

  } catch (error: any) {
    console.error(error);
    return res.status(500).send({ error: error.message });
  }
}
