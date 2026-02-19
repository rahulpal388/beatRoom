import { Request, Response } from "express";
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

export const verifyOtpSignup = async (req: Request, res: Response) => {
  try {
    const { success, data } = verifyOtpType.safeParse(req.body);
    if (!success) {
      return res.status(401).json({
        message: "Invalid input",
      });
    }

    const dbOtp = await optModel.findOne({ email: data.email });

    if (!dbOtp) {
      return res.status(401).json({
        message: "otp expire resend again ",
      });

    }

    const isMatchOtp = matchHash(data.otp, dbOtp.otp)
    if (!isMatchOtp) {
      return res.status(401).json({
        message: "Incorrect OTP"
      })
    }


    const user = await createUser({
      username: data.username,
      password: data.password,
      email: data.email
    })

    if (!user) {
      throw new Error("error creating user")
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
      throw new Error("Error creating session")
    }

    setRefCookie(res, refToken);
    setAcsCookie(res, acToken);

    await optModel.findOneAndDelete({ email: data.email })

    res.status(200).json({
      message: "User logged In"
    })




  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "can't verify otp",
    });
  }
};
