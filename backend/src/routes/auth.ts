import { sendEmail } from "../utils/nodeMailer";
import { signin, verifyOtp_signin } from "../controllers/signin";
import { Router } from "express";


const authRouter = Router();

// not completed the otp authentiction
authRouter.post("/signin", signin)
authRouter.post("/verify_otp_sigin", verifyOtp_signin)
authRouter.get("/otp", async (req, res) => {

    const email = "rahulpal20061210@gmail.com"
    const otp = 1234
    const text = `Your OTP is ${otp}. It will expire in 5 minutes.`
    const html = `<p>Your OTP is <b>${otp}</b></p><p>It expires in 5 minutes.</p>`
    try {
        await sendEmail(email, text, html);
        res.send("email has been sended")
    } catch (error) {
        res.send("email error")
    }

})

export default authRouter;
