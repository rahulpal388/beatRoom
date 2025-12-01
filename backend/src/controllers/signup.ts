import { optModel } from "../db/schema/otp.js";
import { userModel } from "../db/schema/user.js";
import { sendEmail } from "../utils/nodeMailer.js";
import { signUpType } from "../zodTypes/authType.js";
import { Request, Response } from "express";
import { TOTP } from "totp-generator";

export const SignUp = async (req: Request, res: Response) => {
  const { data, success } = signUpType.safeParse(req.body);
  if (!success) {
    console.log(req.body);
    return res.status(401).json({
      message: "Invalid Input",
    });
  }
  try {
    console.log("singup");
    const user = await userModel.findOne({ email: data.email });
    console.log(user);
    if (user) {
      return res.status(302).json({
        message: "User Already Exist",
        redirect: "/login",
      });
    }
    const { otp } = TOTP.generate(process.env.OTP_SECRET!);
    console.log(otp);

    await optModel.findOneAndUpdate(
      { email: data.email },
      { email: data.email, otp: otp },
      { upsert: true }
    );

    const text = `Hi ${data.username},
  Your One-Time Password (OTP) is: ${otp}
  Do not share this code with anyone for your account’s security.
  This code is valid for the next 10 minutes.
  If you did not request this OTP, please ignore this email.
  Thank you,
  The BeatRoom Team`;
    await sendEmail(data.email, text, "");
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
