import { Response } from "express";
import { createAcToken, createRefToken } from "./jwtTokens.js";
import { hashString } from "@utils/hashString.js";
import { sessionModal } from "db/schema/session.js";
import { setAcsCookie, setRefCookie } from "./session_cookies.js";



export async function rotateToken(res: Response, email: string, userId: string, sessionId: string, _id: string) {

    const refToken = createRefToken({ email, userId, sessionId, _id })
    const acToken = createAcToken({ email, userId, sessionId, _id })
    const hashRefToken = hashString(refToken);

    const session = await sessionModal.findOneAndUpdate(
        { sessionId },
        { $set: { refToken: hashRefToken } },
        { new: true }
    )

    if (session) {
        setRefCookie(res, refToken);
        setAcsCookie(res, acToken)
    }

} 