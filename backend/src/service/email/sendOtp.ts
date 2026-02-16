import { sendEmail } from "./sendEmail.js";



export async function sendOtp(otp: string, username: string, email: string): Promise<boolean> {


    const text = `Hi ${username},
        Your One-Time Password (OTP) is: ${otp}
        Do not share this code with anyone for your account’s security.
        This code is valid for the next 10 minutes.
        If you did not request this OTP, please ignore this email.
        Thank you,
        The BeatRoom Team`;
    return await sendEmail(email, text, "");


}