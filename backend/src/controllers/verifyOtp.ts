import { verifyOtpType } from "../zodTypes/authType";
import { Request, Response } from "express";
import { encode } from "hi-base32";
import { TOTP } from "totp-generator";
import Jwt from "jsonwebtoken"
import { verify_otp } from "./signin";

export const verifyOtp_signin = (req: Request, res: Response) => {

    try {
        const { success, data } = verifyOtpType.safeParse(req.body);

        if (!success) {
            res.status(411).json({
                message: "Invalid input"
            })

            return;
        }

        const { otp } = TOTP.generate(encode(data.email + process.env.OTP_SECRET), {
            digits: 6,
            algorithm: "SHA-512",
        });




        console.log(`verification email otp is ${otp}`);



        if (verify_otp === data.otp) {
            // insert the user in the DB

            // create the token
            const token = Jwt.sign({
                email: data.email
            }, process.env.JWT_SECRET!)

            res.status(200).json({
                message: "user account is created",
                token
            })

            return
        }

        res.status(400).json({
            message: "Invalid otp"
        })


    } catch (error) {
        console.log(error)
        res.status(411).json({
            message: "can't verify otp"
        })

    }

}