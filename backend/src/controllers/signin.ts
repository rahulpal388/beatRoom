

import { Request, Response } from "express";
import { TOTP } from "totp-generator";
import Jwt from "jsonwebtoken";
import { signinType, verifyOtpType } from "../zodTypes/authType";
import { encode } from "hi-base32";
import { sendEmail } from "../utils/nodeMailer";


// task : delete the storing the otp and then verifying

export let verify_otp = "";

const expire_otp = () => {
    setTimeout(() => {
        verify_otp = "";
    }, 90000);
}


export const signin = async (req: Request, res: Response) => {
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


        // task 1.  send the otp to email



        const isEmailSended = await sendEmail(
            data.email,
            `Your OTP is ${otp}. It will expire in 5 minutes.`,
            `<p>Your OTP is <b>${otp}</b></p><p>It expires in 5 minutes.</p>`
        );

        if (!isEmailSended) {
            res.status(500).json({
                message: "server error"
            })
            return;
        }

        // task 1: delete it 
        verify_otp = otp;
        expire_otp();
        res.status(200).json({
            message: "check your email for six digits OTP",
            otp
        })

    } catch (error) {
        console.log(error);
        res.status(411).json({
            success: false,
            message: "can't process "
        })
    }
}

