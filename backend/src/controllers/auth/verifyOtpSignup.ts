import { NextFunction, Request, Response } from "express";
import { verifyOtpType } from "../../zodTypes/authType.js";
import {
  createAcToken,
  createRefToken,
} from "../../service/session/jwtTokens.js";
import { matchHash } from "../../utils/hashString.js";
import { optModel } from "../../db/schema/otp.js";
import { createUser } from "../../service/createUser.js";
import { createSession } from "../../service/session/createSession.js";
import { setAcsCookie, setRefCookie } from "../../service/session/session_cookies.js";
import { createUniqueSessionId } from "../../service/session/createUniqueSessionId.js";
import { formatValidationError } from "../../utils/formatZodValidationError.js";
import { apiError } from "../../utils/apiError.js";

export const verifyOtpSignup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { success, data, error } = verifyOtpType.safeParse(req.body);
    if (!success) {
      return next(new apiError(400, "Invalid Input", {
        message: formatValidationError(error)
      }))
    }

    const dbOtp = await optModel.findOne({ email: data.email });

    if (!dbOtp) {
      return next(new apiError(401, "Expire opt", {
        message: "OTP Expire",
      }))

    }

    const isMatchOtp = matchHash(data.otp, dbOtp.otp)
    if (!isMatchOtp) {
      return next(new apiError(401, "Incorrect OTP", {
        message: "Incorrect OTP"
      }))
    }


    const user = await createUser({
      username: data.username,
      password: data.password,
      email: data.email
    })

    if (!user) {
      return next(new apiError(500, "Error creating user", {
        message: "Server Error"
      }))
    }

    const sessionId = createUniqueSessionId();
    const refToken = createRefToken({ email: data.email, userId: user.userId, sessionId, _id: String(user._id) })
    const acToken = createAcToken({ email: data.email, userId: user.userId, sessionId, _id: String(user._id) })
    const session = await createSession({
      sessionId,
      refToken,
      _id: String(user._id)
    })

    if (!session) {
      return next(new apiError(500, "Error creating session", {
        message: "Error creating session"
      }))
    }

    setRefCookie(res, refToken);
    setAcsCookie(res, acToken);


    res.status(200).json({
      profile_image: user.profile_image,
      userId: user.userId,
      username: user.username,
      email: user.email
    })




  } catch (error) {
    console.error(error);
    next(new apiError(500, "error verifying otp", {
      message: "Server Error"
    }))
  }
};
