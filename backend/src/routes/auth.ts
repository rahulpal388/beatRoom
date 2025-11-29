import { Router } from "express";
import { verifyOtp_signin } from "../controllers/verifyOtp.js";
import { SignUp } from "../controllers/signup.js";
import { Login } from "../controllers/login.js";
import { Logout } from "../controllers/logout.js";
import { RefreshToken } from "../controllers/refreshToken.js";

const authRouter = Router();

authRouter.post("/signup", SignUp);
authRouter.post("/verify_otp_sigin", verifyOtp_signin);

authRouter.post("/login", Login);
authRouter.get("/logout", Logout);
authRouter.get("/refresh", RefreshToken);

export default authRouter;
