import { IAuthUser, ILoginData } from "@/types/authType";
import api from "../baseUrlAxios";
import axios from "axios";



export async function loginUser(data: ILoginData): Promise<{
    success: true;
    user: IAuthUser
    message: string
} | {
    success: false,
    message: string
}> {

    try {
        const user = (await api.post('/auth/login', data)).data;
        return {
            success: true,
            user,
            message: "Login Successfull"
        }

    } catch (error) {
        if (axios.isAxiosError(error)) {

            return {
                success: false,
                message: error.response?.data.message,
            };
        }
        return {
            success: false,
            message: "Error Loging",
        };
    }

}