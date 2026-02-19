import { formatValidationError } from "../../utils/formatZodValidationError.js";
import { signUpType } from "../../zodTypes/authType.js";
import { Request, Response } from "express";
import { sendVerificationOtp } from "../../service/sendVerificationOtp.js";



export const resendOtp = async (req: Request, res: Response) => {
    const { data, success, error } = signUpType.safeParse(req.body);

    if (!success) {
        return res.status(401).json({
            message: formatValidationError(error)
        })
    }

    try {
        const isEmailSent = await sendVerificationOtp(data.email, data.username);

        if (!isEmailSent) {
            throw new Error("Email failed to send")
        }
        res.status(200).json({
            message: "Opt Send",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error",
        });
    }



}