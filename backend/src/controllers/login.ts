
import { createAccessToken, createRefreshToken } from "../utils/jwtTokens.js";
import { DBClient } from "../db/index.js";
import { signinType } from "../zodTypes/authType.js";
import { Request, Response } from "express";
import { matchPassword } from "../utils/bcryptPassword.js";



export const Login = async (req: Request, res: Response) => {

    const { data, success, error } = signinType.safeParse(req.body);

    if (!success) {
        return res.status(401).json({
            message: error.message
        })
    }

    const user = await DBClient.user.findFirst({
        where: {
            email: data.email
        }
    })

    if (!user) {
        return res.status(302).json({
            message: "User not found signup first",
            redirect: "/signup"
        })
    }


    const isPasswordCorrect = matchPassword(data.password, user.password);

    if (!isPasswordCorrect) {
        return res.status(401).json({
            message: "Invalid Password"
        })
    }


    const accessToken = createAccessToken({ email: user.email, userId: user.userId });
    const refreshToken = createRefreshToken({ email: user.email, userId: user.userId });

    await DBClient.user.update({
        where: {
            email: data.email
        },
        data: {
            refreshToken
        }
    })

    res.status(200)
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            sameSite: "strict",
            maxAge: 1000 * 60 * 15
        })
        .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 7
        })
        .json({
            message: "Logged In",
            userId: user.userId,
            username: user.username,
            profile: user.profile
        })


}