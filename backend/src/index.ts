import express from "express"
import dotenv from "dotenv"
import authRouter from "./routes/auth";
import roomRouter from "./routes/room";
import cors from "cors"
import useSong from "./routes/songs";
import passport from "passport";
import { googleAuthStartegy } from "./passportStrategy/googleStrategy";
import cookieParser from "cookie-parser"
import { nextError } from "./middleware/errorHandler";




export const roomDB: {
    username: string,
    roomname: string,
    roomId: string
}[] = []

dotenv.config();
const PORT = process.env.PORT || 8081;


const app = express();

// const pgSession = connectPgSimple(session);

app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

// app.use(session({
//     store: new pgSession({
//         pool: new pg.Pool({
//             user: process.env.DATABASE_USERNAME,
//             password: process.env.DATABASE_PASSWORD,
//             host: process.env.DATABASE_HOST,
//             port: Number(process.env.DATABASE_PORT) || 5432,
//             database: process.env.DATABASE_DB,
//             ssl: {
//                 rejectUnauthorized: true
//             }
//         }),
//         tableName: "session",
//         createTableIfMissing: true
//     }),
//     secret: process.env.SESSION_SECRET!,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         httpOnly: true,
//         secure: false,
//         sameSite: "lax"
//     }
// }))

app.use(passport.initialize())
// app.use(passport.session());

// passport.use("signup", LocalSignUpStrategy);
// passport.use("login", LocalSignInStrategy);





// passport.use(googleAuthStartegy);


app.use(nextError)
app.use(express.json())



app.use("/api/v1/auth", authRouter);
app.use("/api/v1/room", roomRouter);
app.use("/api/v1/song", useSong);




app.listen(PORT, () => {
    console.log(`Server is running on the ${PORT}.........`)
})
