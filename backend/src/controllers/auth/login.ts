import { Request, Response } from "express";
import { signinType } from "../../zodTypes/authType.js";
import { matchHash } from "../../utils/hashString.js";
import { userModel } from "../../db/schema/user.js";
import { createSession } from "service/session/createSession.js";
import { createUniqueSessionId } from "service/session/createUniqueSessionId.js";
import { createAcToken, createRefToken } from "service/session/jwtTokens.js";
import { setAcsCookie, setRefCookie } from "service/session/session_cookies.js";
import { formatValidationError } from "@utils/formatZodValidationError.js";

export const Login = async (req: Request, res: Response) => {
  const { data, success, error } = signinType.safeParse(req.body);
  if (!success) {
    return res.status(401).json({
      message: formatValidationError(error)
    });
  }

  try {

    const user = await userModel.findOne({ email: data.email }, { password: 1, userId: 1, _id: 1 });

    if (!user) {
      return res.status(401).json({
        message: "Login User doesn't exits"
      })
    }

    const matchPassword = matchHash(data.password, user.password);

    if (!matchPassword) {
      return res.status(401).json({
        message: "Incorrect Password"
      })
    }
    const sessionId = createUniqueSessionId();
    const refToken = createRefToken({ email: data.email, userId: user.userId, sessionId, _id: String(user._id) })
    const acToken = createAcToken({ email: data.email, userId: user.userId, sessionId, _id: String(user._id) })
    await createSession({ refToken, sessionId, _id: String(user._id) })
    setRefCookie(res, refToken);
    setAcsCookie(res, acToken)

    res.status(200).json({
      message: "User logged in"
    })


  } catch {
    return res.status(500).json({
      message: "Internal server error"
    })
  }



};
