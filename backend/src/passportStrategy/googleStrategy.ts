import googlePassport from "passport-google-oauth20"


// not done yet

const GoogleStartegy = googlePassport.Strategy;

export const googleAuthStartegy = new GoogleStartegy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_SECRET_ID!,
    callbackURL: "http://localhost:8080/api/v1/auth/signin/google/callback"
}, (accessToken, refreshToken, profile, done) => {

    console.log(profile)
    done(null, profile);

})