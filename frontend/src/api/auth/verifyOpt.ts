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
        const user = await api.post("/auth/verifyOtp", data);

        return {
            success: true,
            user: user.data
        }
    } catch (error) {

        if (axios.isAxiosError(error)) {
            if (error.status === 400) {
                return {
                    success: false,
                    message: "Otp Expire"
                }
            }
            if (error.status === 401) {
                return {
                    success: false,
                    message: "Incorrect Otp"
                }
            }


        }

        return {
            success: false,
            message: "Error"
        }

    }

}