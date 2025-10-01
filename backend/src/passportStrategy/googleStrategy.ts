import { generateUniqueUserId } from "../utils/generateUniqueId";
import { createAccessToken, createRefreshToken } from "../utils/jwtTokens";
import { DBClient } from "../db/index";
import googlePassport from "passport-google-oauth20"


// not done yet

const GoogleStartegy = googlePassport.Strategy;

export const googleAuthStartegy = new GoogleStartegy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_SECRET_ID!,
    callbackURL: "http://localhost:8080/api/v1/auth/signin/google/callback"

}, async (accessToken, refreshToken, profile, done) => {

    const email = profile._json.email
    const username = profile._json.name
    const profilePicture = profile._json.picture
    const isVerified = profile._json.email_verified

    try {


        const user = await DBClient.user.findFirst({
            where: {
                email
            }
        })

        if (user) {
            const accessToken = createAccessToken({ email: user.email, userId: user.userId });
            const refreshToken = createRefreshToken({ email: user.email, userId: user.userId });

            await DBClient.user.update({
                where: {
                    email: user.email
                },
                data: {
                    refreshToken
                }
            })

            return done(null, {
                accessToken,
                refreshToken,
                userId: user.userId
            });
        }

        const userId = generateUniqueUserId(email!);
        const accessToken = createAccessToken({ email: email!, userId: userId });
        const refreshToken = createRefreshToken({ email: email!, userId: userId });
        const createdUser = await DBClient.user.create({
            data: {
                email: email!,
                username: username!,
                userId,
                refreshToken,
                isVerified: isVerified
            }
        })

        return done(null, {
            accessToken,
            refreshToken,
            userId
        });

    } catch (error) {

        return done({ status: false, message: "something went wrong " }, false);

    }

})