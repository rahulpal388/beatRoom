import { IAuthFormData } from "@/types/authType";
import api from "../baseUrlAxios";




export async function resendOtp(data: IAuthFormData): Promise<{
    success: boolean;
    message: string
}> {

    try {
        await api.post(`/auth/resendOtp`, data);

        return {
            success: true,
            message: "OTP Send"
        }
    } catch {
        return {
            success: false,
            message: "Error Resend OTP"
        };
    }

}