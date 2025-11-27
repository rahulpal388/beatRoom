import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth";
import roomRouter from "./routes/room";
import cors from "cors";
import useSong from "./routes/songs";
import passport from "passport";
import cookieParser from "cookie-parser";
import { nextError } from "./middleware/errorHandler";

import dns from "dns";
import { useArtist } from "./routes/artist";
import { usePlaylist } from "./routes/playlist";
import useAlbum from "./routes/album";
dns.setDefaultResultOrder("ipv4first");

export const roomDB: {
  username: string;
  roomname: string;
  roomId: string;
}[] = [];

dotenv.config();
const PORT = process.env.PORT || 8081;

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(nextError);
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/room", roomRouter);
app.use("/api/v1/song", useSong);
app.use("/api/v1/artist", useArtist);
app.use("/api/v1/album", useAlbum);
app.use("/api/v1/playlist", usePlaylist);

app.listen(PORT, () => {
  console.log(`Server is running on the ${PORT}.........`);
});
