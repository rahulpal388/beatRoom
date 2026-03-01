import { formatValidationError } from "../../utils/formatZodValidationError.js";
import { signUpType } from "../../zodTypes/authType.js";
import { NextFunction, Request, Response } from "express";
import { sendVerificationOtp } from "../../service/sendVerificationOtp.js";
import { apiError } from "../../utils/apiError.js";



export const resendOtp = async (req: Request, res: Response, next: NextFunction) => {
    const { data, success, error } = signUpType.safeParse(req.body);

    if (!success) {
        return next(new apiError(401, "Invalid input", {
            message: formatValidationError(error)
        }))
    }

    try {
        const isEmailSent = await sendVerificationOtp(data.email, data.username);

        if (!isEmailSent) {
            return next(new apiError(500, "Error resending OTP", {
                message: "Error Sending Resend OTP"
            }))
        }
        res.status(200).json({
            message: "Opt Send",
        });
    } catch {
        next(new apiError(500, "Error Resending OTP", {
            message: "Server Error"
        }))
    }



}