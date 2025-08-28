

import { Request, Response } from "express";
import { TOTP } from "totp-generator";
import Jwt from "jsonwebtoken";
import { signinType, verifyOtpType } from "../zodTypes/authType";
import { encode } from "hi-base32";





export const signin = (req: Request, res: Response) => {
    console.log(req.body)
    try {


        const { success, data } = signinType.safeParse(req.body);

        if (!success) {

            res.status(411).json({
                success: false,
                message: "Invalid input "
            })

            return;
        }

        // generate the otp 

        const { otp } = TOTP.generate(encode(data.email + process.env.OTP_SECRET), {
            digits: 6,
            algorithm: "SHA-512",
            period: 90
        })

        console.log(`the otp is ${otp}`)
        console.log(process.env.NODE_EN)

        const generateOtp = process.env.NODE_EN === "dev" ? "123456" : otp;

        // task 1.  send the otp to email


        res.status(200).json({
            message: "check your email for six digits OTP",
            generateOtp
        })

    } catch (error) {
        console.log(error);
        res.status(411).json({
            success: false,
            message: "can't process "
        })
    }
}


export const verifyOtp_signin = (req: Request, res: Response) => {

    try {
        const { success, data } = verifyOtpType.safeParse(req.body);

        if (!success) {
            res.status(411).json({
                message: "Invalid input"
            })

            return;
        }

        const { otp } = TOTP.generate(encode(data.email + process.env.OTP_SECRET));
        console.log(`verification email otp is ${otp}`);
        const generateOtp = process.env.NODE_EN === "dev" ? "123456" : otp;

        if (generateOtp === data.otp) {
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