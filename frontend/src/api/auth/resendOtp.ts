import { IAuthFormData } from "@/types/authType";
import api from "../baseUrlAxios";




export async function resendOtp(data: IAuthFormData): Promise<boolean> {

    try {
        await api.post(`/auth/resendOtp`, data);

        return true;
    } catch (error) {
        return false;
    }

}