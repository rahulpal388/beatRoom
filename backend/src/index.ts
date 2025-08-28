import express from "express"
import dotenv from "dotenv"
import authRouter from "./routes/auth";


dotenv.config();
const PORT = process.env.PORT || 8081;


const app = express();

app.use(express.json())

app.use("/api/v1/user", authRouter)


app.listen(PORT, () => {
    console.log(`Server is running on the ${PORT}.........`)
})