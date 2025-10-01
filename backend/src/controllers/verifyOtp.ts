import { verifyOtpType } from "../zodTypes/authType";
import { Request, Response } from "express";
import { DBClient } from "../db/index";
import { createAccessToken, createRefreshToken } from "../utils/jwtTokens";
import { hashPassword } from "../utils/bcryptPassword";
import { generateUniqueUserId } from "../utils/generateUniqueId";

export const verifyOtp_signin = async (req: Request, res: Response) => {


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
            const passwordHash = hashPassword(data.password);
            const userId = generateUniqueUserId(data.email)
            const accessToken = createAccessToken({ email: data.email });
            const refreshToken = createRefreshToken({ email: data.email });

            const user = await DBClient.user.create({
                data: {
                    username: data.username,
                    email: data.email,
                    password: passwordHash,
                    userId: userId,
                    isVerified: true,
                    refreshToken
                }
            })

            await DBClient.otp.delete({
                where: {
                    email: data.email
                }
            })

            return res.status(200)
                .cookie("accessToken", accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production" ? true : false,
                    sameSite: process.env.NODE_ENV === "production" ? "strict" : "none",
                    maxAge: 1000 * 60 * 15
                })
                .cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production" ? true : false,
                    sameSite: process.env.NODE_ENV === "production" ? "strict" : "none",
                    maxAge: 1000 * 60 * 60 * 24 * 7
                })
                .json({
                    message: "use logged in successful ",
                    userId: user.userId
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