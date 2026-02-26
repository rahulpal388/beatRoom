import { IAuthFormData } from "@/types/authType";
import api from "../baseUrlAxios";
import axios from "axios";



export async function userSignUp(data: IAuthFormData): Promise<{
    success: boolean;
    redirect: string
} | null> {

    try {
        const respponse = await api.post(`/auth/signup`, data);

        return {
            success: true,
            redirect: ""
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.status === 301) {
                return {
                    success: false,
                    redirect: "/login"
                }
            }
        }

        return null;

    }
}