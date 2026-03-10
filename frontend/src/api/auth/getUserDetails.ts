import clientAPI from "../baseUrlAxios";
import { IAuthUser } from "@/types/authType";


export async function getUserDetails(): Promise<IAuthUser | null> {


    try {
        const userInfo = (await clientAPI.get("/auth/getUserDetail")).data as IAuthUser;

        return userInfo;

    } catch {
        return null;
    }


}