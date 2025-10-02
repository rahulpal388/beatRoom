import passport from "passport";



export const googleAuth = passport.authenticate("google", { scope: ["profile", "email"], session: false })