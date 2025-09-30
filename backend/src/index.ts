import express from "express"
import dotenv from "dotenv"
import authRouter from "./routes/auth";
import roomRouter from "./routes/room";
import cors from "cors"
import useSong from "./routes/songs";
import session from "express-session"
import passport from "passport";
import LocalPassport from "passport-local"
import GooglePassport from "passport-google-oauth20"
import connectPgSimple from "connect-pg-simple";
import pg from "pg"
import { generateKey } from "crypto";
import { generateUniqueUserId } from "./utils/generateUniqueId";
import { DBClient } from "./db/index";
import { hashPassword } from "./utils/bcryptPassword";



export const roomDB: {
    username: string,
    roomname: string,
    roomId: string
}[] = []

dotenv.config();
const PORT = process.env.PORT || 8081;


const app = express();
const LocalStrategy = LocalPassport.Strategy;
const GoogleStartegy = GooglePassport.Strategy
const pgSession = connectPgSimple(session);


app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use(session({
    store: new pgSession({
        pool: new pg.Pool({
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT) || 5432,
            database: process.env.DATABASE_DB,
        }),
        tableName: "session",
        createTableIfMissing: true
    }),
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    }
}))

app.use(passport.initialize())
app.use(passport.session());

passport.use("signup", new LocalStrategy({ usernameField: "email", passReqToCallback: true }, async (req, email, password, done) => {


    try {


        const isUser = await DBClient.user.findFirst({
            where: {
                email: email,
            }
        })

        if (!isUser) {
            const userId = generateUniqueUserId(email);
            const passwordHash = hashPassword(password)

            const user = await DBClient.user.create({
                data: {
                    email: email,
                    password: passwordHash,
                    UserId: userId
                }
            })

            console.log("user id is  => ", user.id);

            return done(null, user.id)
        }



    } catch (error) {
        console.log("db error")
        done(error)
    }



}))



passport.serializeUser((id, done) => {
    done(null, id);
})

passport.deserializeUser(async (id: any, done) => {
    try {

        const user = await DBClient.user.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                email: true,
                UserId: true,
                profile: true

            }
        })

        done(null, user)

    } catch (error) {
        done(error)
    }
})



console.log(process.env.GOOGLE_CLIENT_ID!)
console.log(process.env.GOOGLE_SECRET_ID!)
passport.use(new GoogleStartegy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_SECRET_ID!,
    callbackURL: "http://localhost:8080/api/v1/auth/signin/google/callback"
}, (accessToken, refreshToken, profile, done) => {

    console.log(profile)
    done(null, profile);

}))



app.use(express.json())



app.use("/api/v1/auth", authRouter);
app.use("/api/v1/room", roomRouter);
app.use("/api/v1/song", useSong);


app.listen(PORT, () => {
    console.log(`Server is running on the ${PORT}.........`)
})