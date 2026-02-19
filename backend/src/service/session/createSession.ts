import { hashString } from "@utils/hashString.js";
import { sessionModal } from "../../db/schema/session.js";


export async function createSession({
    refToken,
    sessionId,
    _id
}: {
    refToken: string,
    sessionId: string,
    _id: string
}): Promise<boolean> {
    const expireTime = 1000 * 60 * 60 * 24 * 15;
    try {
        const hashRefToken = hashString(refToken)
        const session = await sessionModal.create({
            user_id: _id,
            refToken: hashRefToken,
            sessionId,
            expiresAt: new Date(Date.now() + expireTime)
        })

        if (!session) {
            throw new Error("Session not created error")
        }


        return true
    } catch {
        return false;
    }
}