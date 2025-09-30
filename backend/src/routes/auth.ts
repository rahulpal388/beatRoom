import { sendEmail } from "../utils/nodeMailer";
import { signin } from "../controllers/signin";
import { Router } from "express";
import { verifyOtp_signin } from "../controllers/verifyOtp";
import passport from "passport";


const authRouter = Router();

// not completed the otp authentiction
authRouter.post("/signin", passport.authenticate("signup", { session: false }), async (req, res) => {


    // generate the  opt here 
    const otp = "123456";

    console.log("email => " + req.body.email)

    const isSend = await sendEmail(
        req.body.email,
        `Your OTP is ${otp}. It will expire in 5 minutes.`,
        `<p>Your OTP is <b>${otp}</b></p><p>It expires in 5 minutes.</p>`
    )

    if (!isSend) {
        res.status(500).json({
            message: "error otp sending"
        })
        return;
    }

    res.status(200).json({
        message: "email otp send "
    })


})

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
