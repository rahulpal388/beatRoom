import axios from "axios";
import api from "../baseUrlAxios";
import { IAuthUser } from "@/types/authType";


export async function getUserDetails(): Promise<IAuthUser | null> {


    try {
        const userInfo = (await api.get("/auth/getUserDetail")).data as IAuthUser;

        return userInfo;

    } catch (error) {
        return null;
    }


}