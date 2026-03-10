import { IAuthFormData } from "@/types/authType";
import clientAPI from "../baseUrlAxios";




export async function resendOtp(data: IAuthFormData): Promise<{
    success: boolean;
    message: string
}> {

    try {
        await clientAPI.post(`/auth/resendOtp`, data);

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