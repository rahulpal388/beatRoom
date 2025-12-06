import { Router } from "express";
import { verifyOtp_signin } from "../controllers/auth/verifyOtp.js";
import { SignUp } from "../controllers/auth/signup.js";
import { Login } from "../controllers/auth/login.js";
import { Logout } from "../controllers/auth/logout.js";
import { RefreshToken } from "../controllers/auth/refreshToken.js";
import verifyTokenMiddleware from "../middleware/verifyToken.js";
import { getUserDetail } from "../controllers/auth/getUserDetail.js";

const authRouter = Router();

authRouter.post("/signup", SignUp);
authRouter.post("/verify_otp_sigin", verifyOtp_signin);

authRouter.post("/login", Login);
authRouter.get("/logout", Logout);
authRouter.get("/refresh", RefreshToken);
authRouter.get("/getUserDetail", verifyTokenMiddleware, getUserDetail);

export default authRouter;
