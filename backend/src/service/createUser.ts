import { generateUniqueUserId } from "../utils/generateUniqueId.js";
import { hashString } from "../utils/hashString.js";
import { userModel } from "../db/schema/user.js";



export async function createUser({
    username,
    password,
    email,
}: {
    username: string,
    password: string,
    email: string,
}) {



    try {
        const uniqueUserId = generateUniqueUserId(email);
        const hashPassowrd = hashString(password)
        return await userModel.create({
            userId: uniqueUserId,
            username,
            email: email,
            password: hashPassowrd,
        })

    } catch {
        return null;
    }
}