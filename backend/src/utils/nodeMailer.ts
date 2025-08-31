

import nodemailer from "nodemailer";


const transpoter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL,  //  email 
        pass: process.env.EMAIL_PASS,    // pass code for that email
    },
})


export const sendEmail = async (email: string, text: string, html: string) => {

    try {
        console.log("initiating the email sender")

        const info = await transpoter.sendMail({
            from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
            to: email,
            subject: "Your BeatRoom OTP code",
            text: text,
            html: html
        })

        console.log(info)
    } catch (error) {
        console.log(error);
    }

}
