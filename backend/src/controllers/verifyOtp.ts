import { verifyOtpType } from "../zodTypes/authType";
import { Request, Response } from "express";
import { encode } from "hi-base32";
import { TOTP } from "totp-generator";
import Jwt from "jsonwebtoken"
import { verify_otp } from "./signin";
import { userInfo } from "os";

export const verifyOtp_signin = (req: Request, res: Response) => {
    // console.log(req.body)

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

            console.log(req.session)

            const token = Jwt.sign({
                userId: "12asd123asd",
                email: "email" // task 2: user id not the email
            }, process.env.JWT_SECRET!)

            const user = {
                name: "rahul",
                email: "rahulschoolemail59@gmail.com"
            }

            req.login(user, (err) => {
                if (err) {
                    res.status(500).json({
                        message: "something went wrong"
                    })
                    return;
                }

                res.status(200).json({
                    userId: "12asd123asd",
                    message: "user account is created",
                    token
                })

                return;

            })


            return;
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