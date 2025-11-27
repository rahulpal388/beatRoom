import { Router } from "express";
import { verifyOtp_signin } from "../controllers/verifyOtp";
import { SignUp } from "../controllers/signup";
import { Login } from "../controllers/login";
import { Logout } from "../controllers/logout";
import { RefreshToken } from "../controllers/refreshToken";

const authRouter = Router();

authRouter.post("/signup", SignUp);
authRouter.post("/verify_otp_sigin", verifyOtp_signin);

authRouter.post("/login", Login);
authRouter.get("/logout", Logout);
authRouter.get("/refresh", RefreshToken);

export default authRouter;
