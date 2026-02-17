import { env } from "@zodTypes/envType.js";
import Jwt from "jsonwebtoken";


export const createAcToken = (data: { email: string; userId: string; sessionId: string }) => {
  return Jwt.sign(data, env.Ac_SECRET, { expiresIn: "15m" });
};

export const createRefToken = (data: { email: string; userId: string; sessionId: string }) => {
  return Jwt.sign(data, env.Ref_SECRET, { expiresIn: "15d" });
};



export const verifyJwtToken = (token: string, tokenType: "ref" | "ac"):
  | { isVerified: true; email: string; userId: string; sessionId: string }
  | { isVerified: false; email: null; userId: null; sessionId: null } => {

  try {
    const verifiedToken = Jwt.verify(token, tokenType === "ac" ? env.Ac_SECRET : env.Ref_SECRET);

    if (typeof verifiedToken === "string") {
      throw new Error("Invalid token")
    }

    return {
      email: verifiedToken.email,
      userId: verifiedToken.userId,
      sessionId: verifiedToken.sessionId,
      isVerified: true

    }

  } catch (error) {
    return {
      email: null,
      userId: null,
      sessionId: null,
      isVerified: false
    }
  }

}