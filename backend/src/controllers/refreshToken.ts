import { createAccessToken, createRefreshToken, verifyJwtToken } from "../utils/jwtTokens.js";
import { Request, Response } from "express";





export const RefreshToken = async (req: Request, res: Response) => {

    // const refreshToken = req.cookies.refreshToken;

    // console.log("refreshToken  =>  ", refreshToken);

    // if (!refreshToken) {
    //     return res.status(401).json({
    //         message: "not authenticated"
    //     })
    // }
    // try {

    //     const { data } = verifyJwtToken({ token: refreshToken });


    //     if (!data) {
    //         return res.status(401).json({
    //             message: "error"
    //         })

    //     }

    //     const accessToken = createAccessToken({ email: data.email, userId: data.userId })
    //     const newRefreshToken = createRefreshToken({ email: data.email, userId: data.userId });

    //     const user = await DBClient.user.update({
    //         where: {
    //             email: data.email
    //         },
    //         data: {
    //             refreshToken: newRefreshToken
    //         }
    //     })

    //     res.status(200)
    //         .cookie("accessToken", accessToken, {
    //             httpOnly: true,
    //             secure: process.env.NODE_ENV === "production" ? true : false,
    //             sameSite: "strict",
    //             maxAge: 1000 * 60 * 15
    //         })
    //         .cookie("refreshToken", newRefreshToken, {
    //             httpOnly: true,
    //             secure: process.env.NODE_ENV === "production" ? true : false,
    //             sameSite: "strict",
    //             maxAge: 1000 * 60 * 60 * 24 * 7
    //         })
    //         .json({
    //             message: "logged in successfully",
    //             username: user.username,
    //             userId: user.userId,
    //             profile: user.profile
    //         })



    // } catch (error) {
    //     res.status(401).json({
    //         message: "error"
    //     })
    // }

}