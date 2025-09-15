import express from "express"
import dotenv from "dotenv"
import authRouter from "./routes/auth";
import roomRouter from "./routes/room";
import cors from "cors"
import useSong from "./routes/songs";


export const roomDB: {
    username: string,
    roomname: string,
    roomId: string
}[] = []

dotenv.config();
const PORT = process.env.PORT || 8081;


const app = express();

app.use(cors())
app.use(express.json())

app.use("/api/v1/user", authRouter);
app.use("/api/v1/room", roomRouter);
app.use("/api/v1/song", useSong);


app.listen(PORT, () => {
    console.log(`Server is running on the ${PORT}.........`)
})