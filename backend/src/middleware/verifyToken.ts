import { NextFunction, Request, Response } from "express";
import { verifyJwtToken } from "service/session/jwtTokens.js";
import { rotateToken } from "service/session/rotateToken.js";

const verifyTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.user = { userId: null };
  req.session = { sessionId: null };

  const { ref, ac } = req.cookies;

  console.log(`ref => ${ref}`)
  console.log(`ac => ${ac}`)

  if (ac) {
    const { userId, sessionId } = verifyJwtToken(ac, "ac");
    req.user.userId = userId
    req.session.sessionId = sessionId
  } else {
    if (ref) {
      // verify token
      const { email, userId, sessionId, isVerified } = verifyJwtToken(ref, "ref");
      console.log(email, userId, sessionId)
      if (isVerified) {
        // rotate the token
        rotateToken(res, email, userId, sessionId)
      }
      req.user.userId = userId;
      req.session.sessionId = sessionId;


    } else {
      req.user.userId = null;
      req.session.sessionId = null;
    }


  }
  next();


};

export default verifyTokenMiddleware;
