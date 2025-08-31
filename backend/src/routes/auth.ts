import { sendEmail } from "../utils/nodeMailer";
import { signin } from "../controllers/signin";
import { Router } from "express";
import { verifyOtp_signin } from "../controllers/verifyOtp";


const authRouter = Router();

// not completed the otp authentiction
authRouter.post("/signin", signin)
authRouter.post("/verify_otp_sigin", verifyOtp_signin)

export default authRouter;
