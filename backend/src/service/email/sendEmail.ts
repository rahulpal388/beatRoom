

import { env } from "../../zodTypes/envType.js";
import nodemailer from "nodemailer";


const transpoter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: env.EMAIL,  //  email 
        pass: env.EMAIL_PASS,    // pass code for that email
    },
})


export const sendEmail = async (email: string, text: string, html: string): Promise<boolean> => {

    try {
        console.log("initiating the email sender")

        const info = await transpoter.sendMail({
            from: '"BeatRoom"  <auth.beatroom@gmail.com>',
            to: email,
            subject: "Your BeatRoom OTP code",
            text: text,
            html: html

        })

        console.log(info)
        return true;
    } catch {
        return false;

    }

}
