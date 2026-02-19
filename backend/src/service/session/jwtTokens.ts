import { env } from "../../zodTypes/envType.js";
import Jwt from "jsonwebtoken";

type tokenData = {
  email: string;
  userId: string;
  sessionId: string;
  _id: string
}


export const createAcToken = (data: tokenData) => {
  return Jwt.sign(data, env.Ac_SECRET, { expiresIn: "15m" });
};

export const createRefToken = (data: tokenData) => {
  return Jwt.sign(data, env.Ref_SECRET, { expiresIn: "15d" });
};



export const verifyJwtToken = (token: string, tokenType: "ref" | "ac"):
  | { isVerified: true; email: string; userId: string; sessionId: string, _id: string }
  | { isVerified: false; email: null; userId: null; sessionId: null, _id: null } => {

  try {
    const verifiedToken = Jwt.verify(token, tokenType === "ac" ? env.Ac_SECRET : env.Ref_SECRET);

    if (typeof verifiedToken === "string") {
      throw new Error("Invalid token")
    }

    return {
      email: verifiedToken.email,
      userId: verifiedToken.userId,
      sessionId: verifiedToken.sessionId,
      _id: verifiedToken._id,
      isVerified: true

    }

  } catch {
    return {
      email: null,
      userId: null,
      sessionId: null,
      _id: null,
      isVerified: false
    }
  }

}