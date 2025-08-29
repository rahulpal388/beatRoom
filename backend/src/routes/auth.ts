import { signin, verifyOtp_signin } from "../controllers/signin";
import { Router } from "express";


const authRouter = Router();

// not completed the otp authentiction
authRouter.post("/signin", signin)
authRouter.post("/verify_otp_sigin", verifyOtp_signin)

export default authRouter;
