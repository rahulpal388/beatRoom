import { NextFunction, Request, Response } from "express";
import { signinType } from "../../zodTypes/authType.js";
import { matchHash } from "../../utils/hashString.js";
import { userModel } from "../../db/schema/user.js";
import { createSession } from "../../service/session/createSession.js";
import { createUniqueSessionId } from "../../service/session/createUniqueSessionId.js";
import { createAcToken, createRefToken } from "../../service/session/jwtTokens.js";
import { setAcsCookie, setRefCookie } from "../../service/session/session_cookies.js";
import { formatValidationError } from "../../utils/formatZodValidationError.js";
import { apiError } from "../../utils/apiError.js";

export const Login = async (req: Request, res: Response, next: NextFunction) => {
  const { data, success, error } = signinType.safeParse(req.body);
  console.log("login request come")
  if (!success) {

    return next(new apiError(401, "Invalid Input", {
      message: formatValidationError(error)
    }))
  }

  try {

    const user = await userModel.findOne({ email: data.email }, { password: 1, userId: 1, _id: 1, username: 1, profile_image: 1 });

    if (!user) {
      return next(new apiError(401, "user already eixt", {
        message: "SignUp User Not Found"
      }))
    }

    const matchPassword = matchHash(data.password, user.password);

    if (!matchPassword) {
      return next(new apiError(401, "Incorrect Password", {
        message: "Incorrect Password"
      }))
    }
    const sessionId = createUniqueSessionId();
    const refToken = createRefToken({ email: data.email, userId: user.userId, sessionId, _id: String(user._id) })
    const acToken = createAcToken({ email: data.email, userId: user.userId, sessionId, _id: String(user._id) })
    await createSession({ refToken, sessionId, _id: String(user._id) })
    setRefCookie(res, refToken);
    setAcsCookie(res, acToken)


    res.status(200).json({
      profile_image: user.profile_image,
      userId: user.userId,
      username: user.username,
      email: user.email
    })


  } catch {
    next(new apiError(500, "error logging", {
      message: "Server Error"
    }))
  }



};
