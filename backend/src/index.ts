import express from "express"
import dotenv from "dotenv"
import authRouter from "./routes/auth";
import roomRouter from "./routes/room";


dotenv.config();
const PORT = process.env.PORT || 8081;


const app = express();


app.use(express.json())

app.use("/api/v1/user", authRouter);
app.use("/api/v1/room", roomRouter)


app.listen(PORT, () => {
    console.log(`Server is running on the ${PORT}.........`)
})