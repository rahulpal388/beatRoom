import { NextFunction, Request, Response } from "express";
import { verifyJwtToken } from "../service/session/jwtTokens.js";
import { rotateToken } from "../service/session/rotateToken.js";

const verifyTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.user = { userId: null, _id: null };
  req.session = { sessionId: null };

  const { ref, ac } = req.cookies;

  console.log(req.cookies)

  if (ac) {
    const { userId, sessionId, _id } = verifyJwtToken(ac, "ac");
    req.user.userId = userId
    req.user._id = _id
    req.session.sessionId = sessionId
  } else {
    if (ref) {
      // verify token
      const { email, userId, sessionId, isVerified, _id } = verifyJwtToken(ref, "ref");
      console.log(email, userId, sessionId)
      if (isVerified) {
        // rotate the token
        await rotateToken(res, email, userId, sessionId, _id)
      }
      req.user.userId = userId;
      req.user._id = _id;
      req.session.sessionId = sessionId;


    } else {
      req.user.userId = null;
      req.user._id = null;
      req.session.sessionId = null;
    }


  }
  next();


};

export default verifyTokenMiddleware;
