import { Router } from "express";
import { SignUp } from "../controllers/auth/signup.js";
import { Login } from "../controllers/auth/login.js";
import { Logout } from "../controllers/auth/logout.js";
import verifyTokenMiddleware from "../middleware/verifyToken.js";
import { getUserDetail } from "../controllers/auth/getUserDetail.js";
import { verifyOtpSignup } from "../controllers/auth/verifyOtpSignup.js";
import { resendOtp } from "../controllers/auth/resendOtp.js";

const authRouter = Router();

authRouter.post("/signup", SignUp);
authRouter.post("/verifyOtp", verifyOtpSignup);
authRouter.get("/resendOtp", resendOtp)
authRouter.post("/login", Login);
authRouter.get("/logout", verifyTokenMiddleware, Logout);
authRouter.get("/getUserDetail", verifyTokenMiddleware, getUserDetail);

export default authRouter;
