import { sendEmail } from "../utils/nodeMailer";
import { signin } from "../controllers/signin";
import { Router } from "express";
import { verifyOtp_signin } from "../controllers/verifyOtp";
import passport from "passport";


const authRouter = Router();

// not completed the otp authentiction
authRouter.post("/signin", (req, res, next) => {
    passport.authenticate("local", async (err: any, user: any, info: any) => {

        console.log(user)


        // generate the  opt here 
        const otp = "123456";

        const isSend = await sendEmail(
            user.email,
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


    })(req, res, next);
})

authRouter.get("/signin/google", passport.authenticate("google", { scope: ["profile", "email"] }))

authRouter.get("/signin/google/callback", passport.authenticate("google", { failureRedirect: "http://localhost:3000/login", successRedirect: "http://localhost:3000/dashboard/sundram" }))



authRouter.post("/verify_otp_sigin", verifyOtp_signin)

export default authRouter;
