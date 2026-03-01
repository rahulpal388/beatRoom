import { NextFunction, Request, Response } from "express";
import { userModel } from "../../db/schema/user.js";
import { signUpType } from "../../zodTypes/authType.js";
import { formatValidationError } from "../../utils/formatZodValidationError.js";
import { sendVerificationOtp } from "../../service/sendVerificationOtp.js";
import { apiError } from "../../utils/apiError.js";

export const SignUp = async (req: Request, res: Response, next: NextFunction) => {
  const { data, success, error } = signUpType.safeParse(req.body);
  if (!success) {
    return next(new apiError(400, "Input Validation fail", formatValidationError(error)));
  }

  try {
    const user = await userModel.findOne({ email: data.email }, { email: 1, _id: 1 });

    if (user) {
      return next(new apiError(401, "Redirect ", {
        message: "User Already Exist"
      }))
    }


    const isEmailSent = await sendVerificationOtp(data.email, data.username);

    if (!isEmailSent) {
      return next(new apiError(500, "Email send failed", {
        message: "Failed sending OTP email"
      }))

    }
    res.status(200).json({
      message: "Opt Send",
    });
  } catch (error) {
    console.error(error);
    next(error)
  }
};

