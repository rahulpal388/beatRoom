import { sendEmail } from "../utils/nodeMailer";
import { Router } from "express";
import { verifyOtp_signin } from "../controllers/verifyOtp";
import passport from "passport";
import { TOTP } from "totp-generator";
import { encode } from "hi-base32";
import { DBClient } from "../db/index";
import { signinType } from "../zodTypes/authType";
import { da } from "zod/v4/locales/index.cjs";
import { email } from "zod";
import { unicodeEmail } from "zod/v4/core/regexes.cjs";

const authRouter = Router();

authRouter.post("/signup", async (req, res) => {
    const { data, success } = signinType.safeParse(req.body);

    if (!success) {
        return res.status(401).json({
            message: "invalid input",
        });
    }

    try {
        console.log("singup")
        const user = await DBClient.user.findFirst({
            where: {
                email: data.email,
            },
        });
        console.log(user)
        if (user) {
            return res.status(401).json({
                message: "user already exist",
                redirect: "/login",
            });
        }

        console.log("asdfghjkjhgfdsdfgh")
        const { otp } = TOTP.generate(process.env.OTP_SECRET!);
        console.log(otp);

        await DBClient.otp.upsert({
            where: {
                email: data.email,
            },
            create: {
                otp: otp,
                email: data.email,
                createdAt: new Date(),
                expireAt: new Date(),
            },
            update: {
                otp: otp,
                email: data.email,
                createdAt: new Date(),
                expireAt: new Date(),
            },
        });

        const text = `Hi ${data.username},

Your One-Time Password (OTP) is: ${otp}

Do not share this code with anyone for your account’s security.
This code is valid for the next 10 minutes.

If you did not request this OTP, please ignore this email.
                
Thank you,
                
The BeatRoom Team`;


        await sendEmail(data.email, text, "");

        res.status(200).json({
            message: "opt send successful",
        });
    } catch (error) {
        res.status(500).json({
            message: "server error",
        });
    }
});





authRouter.get(
    "/signin/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
    "/signin/google/callback",
    passport.authenticate("google", {
        failureRedirect: "http://localhost:3000/login",
        successRedirect: "http://localhost:3000/dashboard/sundram",
    })
);

authRouter.post("/verify_otp_sigin", verifyOtp_signin);
authRouter.get("/logout", (req, res) => {
    req.logout({ keepSessionInfo: false }, (err) => {
        if (err) {
            return res.status(500).json({
                message: "error while logout",
            });
        }
    });

    res.clearCookie("connect.sid");

    res.status(200).json({
        message: "user logout successsful",
    });
});

export default authRouter;
