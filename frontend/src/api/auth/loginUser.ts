import { IAuthUser, ILoginData } from "@/types/authType";
import api from "../baseUrlAxios";
import axios from "axios";



export async function loginUser(data: ILoginData): Promise<{
    success: boolean;
    message: string;
    user: IAuthUser | null
}> {

    try {
        const user = (await api.post('/auth/login', data)).data;
        return {
            success: true,
            message: "Login Successfull",
            user
        }

    } catch (error) {
        if (axios.isAxiosError(error)) {

            return {
                success: false,
                message: error.message,
                user: null
            };
        }
        return {
            success: false,
            message: "Error",
            user: null
        };
    }

}