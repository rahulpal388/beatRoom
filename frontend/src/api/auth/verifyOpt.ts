import { IAuthOtpVerifyData, IAuthUser } from "@/types/authType";
import axios from "axios";
import api from "../baseUrlAxios";



export async function verifyOtp(data: IAuthOtpVerifyData): Promise<{
    success: true;
    user: IAuthUser
} | {
    success: false;
    message: string;
}> {


    try {
        const user = await api.post("/auth/verifyOtp", data)

        return {
            success: true,
            user: user.data
        }
    } catch (error) {

        if (axios.isAxiosError(error)) {

            return {
                success: false,
                message: error.response?.data.message || "Error Verifying OTP"
            }


        }

        return {
            success: false,
            message: "Error Verifying OTP"
        }

    }


}