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

        if (verify_otp === data.otp) {
            // task 1 :  insert the user in the DB



            const token = Jwt.sign({
                userId: "12asd123asd",
                email: data.email // task 2: user id not the email
            }, process.env.JWT_SECRET!)

            res.status(200).json({
                userId: "12asd123asd",
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