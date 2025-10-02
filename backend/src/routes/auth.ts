import { Router } from "express";
import { verifyOtp_signin } from "../controllers/verifyOtp";
import passport, { use } from "passport";
import { SignUp } from "../controllers/signup";
import { googleAuth } from "../controllers/googleAuth";
import { googleCallback, googleCallbackCookie } from "../controllers/googleCallback";
import { Login } from "../controllers/login";
import { Logout } from "../controllers/logout";
import { RefreshToken } from "../controllers/refreshToken";

const authRouter = Router();

authRouter.post("/signup", SignUp);
authRouter.post("/verify_otp_sigin", verifyOtp_signin);

authRouter.post("/login", Login)
authRouter.get("/logout", Logout)
authRouter.get("/refresh", RefreshToken)


authRouter.get("/signin/google", googleAuth);
authRouter.get("/signin/google/callback", googleCallback, googleCallbackCookie);



export default authRouter;
