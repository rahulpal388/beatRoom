import { verifyOtpType } from "../zodTypes/authType";
import { Request, Response } from "express";
import { encode } from "hi-base32";
import { TOTP } from "totp-generator";
import Jwt from "jsonwebtoken"
import { DBClient } from "../db/index";

export const verifyOtp_signin = async (req: Request, res: Response) => {
    // console.log(req.body)

    try {
        const { success, data } = verifyOtpType.safeParse(req.body);

        if (!success) {
            return res.status(411).json({
                message: "Invalid input"
            })


        }

        const dbOtp = await DBClient.otp.findFirst({
            where: {
                email: data.email
            }
        })


        console.log("opt is this ======> ", dbOtp?.otp)
        if (dbOtp?.otp === data.otp) {

            const user = await DBClient.user.findFirst({
                where: {
                    email: data.email
                }
            })

            req.login(user!.id, (err) => {
                if (err) {
                    return res.status(500).json({
                        message: "something went wrong"
                    })
                }

                return res.status(200).json({
                    userId: "12asd123asd",
                    message: "user account is created",

                })


            })

            return;

        }

        return res.status(400).json({
            message: "Invalid otp"
        })


    } catch (error) {
        console.log(error)
        res.status(411).json({
            message: "can't verify otp"
        })

    }

}