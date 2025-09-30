import { sendEmail } from "../utils/nodeMailer";
import { signin } from "../controllers/signup";
import { Router } from "express";
import { verifyOtp_signin } from "../controllers/verifyOtp";
import passport from "passport";
import { TOTP } from "totp-generator";
import { encode } from "hi-base32";
import { DBClient } from "../db/index";


const authRouter = Router();


authRouter.post("/signup", passport.authenticate("signup", { session: false }), async (req, res) => {


    const { otp } = TOTP.generate(encode(req.body.email + process.env.OTP_SECRET), {
        digits: 6,
        algorithm: "SHA-512",
        period: 90
    })

    await DBClient.otp.upsert({
        where: {
            email: req.body.email
        },
        update: {
            email: req.body.email,
            otp: otp,
            createdAt: new Date(),
            expireAt: new Date()
        },
        create: {
            email: req.body.email,
            otp: otp,
            createdAt: new Date(),
            expireAt: new Date()
        }
    })

    const isSend = await sendEmail(
        req.body.email,
        `Your OTP is ${otp}. It will expire in 5 minutes.`,
        `<p>Your OTP is <b>${otp}</b></p><p>It expires in 5 minutes.</p>`
    )

    if (!isSend) {
        return res.status(500).json({
            message: "error otp sending"
        })

    }

    res.status(200).json({
        message: "email otp send "
    })


});

authRouter.get("/signin/google", passport.authenticate("google", { scope: ["profile", "email"] }))

authRouter.get("/signin/google/callback", passport.authenticate("google", { failureRedirect: "http://localhost:3000/login", successRedirect: "http://localhost:3000/dashboard/sundram" }))



authRouter.post("/verify_otp_sigin", verifyOtp_signin)
authRouter.get("/logout", (req, res) => {

    req.logout({ keepSessionInfo: false }, (err) => {
        if (err) {
            return res.status(500).json({
                message: "error while logout"
            })
        }
    })
    console.log(req.session)

    req.session.destroy((err) => {
        if (err) {
            console.log("can't destroy the session")
            return res.status(500).json({
                message: "unable to destroy the session"
            })
        }
    })

    res.clearCookie("connect.sid")

    res.status(200).json({
        message: "user logout successsful"
    })

})

export default authRouter;
