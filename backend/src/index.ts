import "dotenv/config";

import express from "express";
import authRouter from "./routes/auth.js";
import roomRouter from "./routes/room.js";
import cors from "cors";
import useSong from "./routes/songs.js";
import cookieParser from "cookie-parser";

import dns from "dns";
import { useArtist } from "./routes/artist.js";
import { usePlaylist } from "./routes/playlist.js";
import useAlbum from "./routes/album.js";
import { DBConnect } from "./db/index.js";
import verifyTokenMiddleware from "./middleware/verifyToken.js";
import { env } from "@zodTypes/envType.js";
dns.setDefaultResultOrder("ipv4first");

const PORT = env.PORT || 8081;

const app = express();

app.use(cookieParser());


// cors configuration
const allowedOrigins = env.CROSS_ORIGIN_URL?.split(",").map(x => x.trim()) || []
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins?.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Origin not allowed"))
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

DBConnect();
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/room", verifyTokenMiddleware, roomRouter);
app.use("/api/v1/song", verifyTokenMiddleware, useSong);
app.use("/api/v1/artist", verifyTokenMiddleware, useArtist);
app.use("/api/v1/album", verifyTokenMiddleware, useAlbum);
app.use("/api/v1/playlist", verifyTokenMiddleware, usePlaylist);

app.listen(PORT, () => {
  console.log(`Server is running on the ${PORT}.........`);
});
