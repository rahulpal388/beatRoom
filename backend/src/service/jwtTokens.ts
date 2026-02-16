import { env } from "@zodTypes/envType.js";
import Jwt from "jsonwebtoken";

const defaultSessionId = "";

export const createAcToken = (data: { email: string; userId: string; sessionId: string }) => {
  return Jwt.sign(data, env.Ac_SECRET, { expiresIn: "15m" });
};

export const createRefToken = (data: { email: string; userId: string; sessionId: string }) => {
  return Jwt.sign(data, env.Ref_SECRET, { expiresIn: "15d" });
};

export function createAccessToken(data: { email: string; userId: string; sessionId?: string }) {
  return createAcToken({ ...data, sessionId: data.sessionId ?? defaultSessionId });
}

export function createRefreshToken(data: { email: string; userId: string; sessionId?: string }) {
  return createRefToken({ ...data, sessionId: data.sessionId ?? defaultSessionId });
}

export function verifyJwtToken(params: { token: string }): {
  verify: boolean;
  data?: { email: string; userId: string; sessionId?: string };
} {
  const { token } = params;
  try {
    const decodedAc = Jwt.verify(token, env.Ac_SECRET) as { email: string; userId: string; sessionId?: string };
    return { verify: true, data: decodedAc };
  } catch {
    try {
      const decodedRef = Jwt.verify(token, env.Ref_SECRET) as { email: string; userId: string; sessionId?: string };
      return { verify: true, data: decodedRef };
    } catch {
      return { verify: false };
    }
  }
}

