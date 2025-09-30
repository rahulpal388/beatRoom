import { hashPassword, matchPassword } from "../utils/bcryptPassword";
import { generateUniqueUserId } from "../utils/generateUniqueId";
import { DBClient } from "../db/index";
import LocalPassport from "passport-local"

const LocalStrategy = LocalPassport.Strategy;

export const LocalSignUpStrategy = new LocalStrategy({ usernameField: "email", passReqToCallback: true }, async (req, email, password, done) => {


    try {
        const isUser = await DBClient.user.findFirst({
            where: {
                email: email,
            }
        })

        if (isUser) {
            return done(null, false, { message: "User already exist " })
        }

        if (!isUser) {
            const userId = generateUniqueUserId(email);
            const passwordHash = hashPassword(password)

            const user = await DBClient.user.create({
                data: {

                    email: email,
                    username: req.body.username,
                    password: passwordHash,
                    UserId: userId
                }
            })
            return done(null, user.id)
        }



    } catch (error) {
        console.log("db error")
        done(null, false, { message: "error while singing up" })
    }



})



export const LocalSignInStrategy = new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {

    try {

        const user = await DBClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user) {
            return done(null, false, { message: " user not found " })
        }

        if (user) {
            const isMatchPassword = matchPassword(password, user.password);

            if (!isMatchPassword) {
                return done(null, false, { message: "invalid passowod" })
            }

            return done(null, user.id);

        }


    } catch (error) {
        done(null, false, { message: "error while singing In" })
    }

})