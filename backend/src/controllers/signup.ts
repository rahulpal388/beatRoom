import { sendEmail } from "../utils/nodeMailer";
import { signUpType } from "../zodTypes/authType";
import { DBClient } from "../db/index";
import { Request, Response } from "express";
import { TOTP } from "totp-generator";



export const SignUp = async (req: Request, res: Response) => {
    const { data, success } = signUpType.safeParse(req.body);
    if (!success) {
        console.log(req.body)

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
            return res.status(302).json({
                message: "user already exist",
                redirect: "/login",
            });
        }


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

}