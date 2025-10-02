import { NextFunction, Request, Response } from "express"
import passport from "passport"



export const googleCallback = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("google", {
        failureRedirect: "http://localhost:3000/login",
        session: false
    }, (err, user) => {
        if (err) {
            return next(err)
        }
        req.user = user
        next()
    })(req, res, next)
}



export const googleCallbackCookie = (req: Request, res: Response) => {
    const user = req.user as { accessToken: string, refreshToken: string, userId: string }
    if (user) {

        console.log("access token ====> ", user?.accessToken);
        console.log("refresh token ====> ", user?.refreshToken);
        console.log("user id ====> ", user?.userId);
    }


    res.cookie("accessToken", user.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        sameSite: "strict",
        maxAge: 1000 * 60 * 15
    })
        .cookie("refreshToken", user.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 7
        })
        .redirect(`http://localhost:3000/dashboard/${user.userId}`)
}