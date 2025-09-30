import crypto from "crypto"


export const generateUniqueUserId = (email: string): string => {

    const id = crypto.createHmac("sha256", process.env.UINQUE_USERID_SECRET!).update(email.trim().toLocaleLowerCase());

    return id.digest("base64url").slice(0, 8)


}