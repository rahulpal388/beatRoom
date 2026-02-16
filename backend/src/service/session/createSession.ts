import { sessionModal } from "../../db/schema/session.js";
import { userModel } from "../../db/schema/user.js";


export async function createSession({
    email,
    refToken,
    sessionId
}: {
    email: string,
    refToken: string,
    sessionId: string
}): Promise<boolean> {
    const expireTime = 1000 * 60 * 60 * 24 * 15;
    try {

        const session = await sessionModal.create({
            refToken,
            sessionId,
            expiresAt: new Date(Date.now() + expireTime)
        })

        if (!session) {
            throw new Error("Session not created error")
        }

        await userModel.findOneAndUpdate(
            { email },
            { $addToSet: { session: session._id } }
        )
        return true
    } catch (error) {
        return false;
    }
}