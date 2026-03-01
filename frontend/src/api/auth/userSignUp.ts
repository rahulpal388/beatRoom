import { IAuthFormData } from "@/types/authType";
import api from "../baseUrlAxios";
import axios from "axios";



export async function userSignUp(data: IAuthFormData): Promise<{
    success: boolean;
    redirect: boolean;
    message: string
}> {

    try {
        const response = await api.post(`/auth/signup`, data);

        return {
            success: true,
            message: response.data.message,
            redirect: false
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.status === 401) {
                return {
                    success: false,
                    redirect: true,
                    message: "Redirecting to login"
                }
            }
        }

        return {
            success: false,
            redirect: false,
            message: "Error Signup"
        }

    }
}