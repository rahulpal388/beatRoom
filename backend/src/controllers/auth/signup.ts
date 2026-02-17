import { Request, Response } from "express";
import { optModel } from "../../db/schema/otp.js";
import { userModel } from "../../db/schema/user.js";
import { signUpType } from "../../zodTypes/authType.js";
import { hashString } from "../../utils/hashString.js";
import { generateOtp } from "../../service/genetateOtp.js";
import { sendOtp } from "../../service/email/sendOtp.js";
import { formatValidationError } from "@utils/formatZodValidationError.js";
import { sendVerificationOtp } from "service/sendVerificationOtp.js";

export const SignUp = async (req: Request, res: Response) => {
  const { data, success, error } = signUpType.safeParse(req.body);
  if (!success) {
    console.log(req.body);
    return res.status(401).json({
      message: formatValidationError(error),
    });
  }

  try {
    console.log("singup");
    const user = await userModel.findOne({ email: data.email }, { email: 1, _id: 1 });
    console.log(user);

    if (user) {
      return res.status(301).json({
        message: "User Already Exist",
        redirect: "/login",
      });
    }


    const isEmailSent = await sendVerificationOtp(data.email, data.username);

    if (!isEmailSent) {
      throw new Error("Email failed to send")
    }
    res.status(200).json({
      message: "Opt Send",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
