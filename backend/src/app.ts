
import express from "express";
import authRouter from "./routes/auth.js";
import cors from "cors";
import useSong from "./routes/songs.js";
import cookieParser from "cookie-parser";
import { useArtist } from "./routes/artist.js";
import { usePlaylist } from "./routes/playlist.js";
import useAlbum from "./routes/album.js";
import verifyTokenMiddleware from "./middleware/verifyToken.js";
import { env } from "./zodTypes/envType.js";
import { removeEntity } from "./controllers/removeEntity.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { apiError } from "./utils/apiError.js";
import helmet from "helmet";
import { roomRouter } from "./routes/room.js";

export const app = express();

app.use(helmet());
app.use(cookieParser());

const allowedOrigins =
  env.CROSS_ORIGIN_URL?.split(",").map((origin) => origin.trim()) ?? [];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Origin not allowed"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/room", verifyTokenMiddleware, roomRouter);
app.use("/api/v1/song", verifyTokenMiddleware, useSong);
app.use("/api/v1/artist", verifyTokenMiddleware, useArtist);
app.use("/api/v1/album", verifyTokenMiddleware, useAlbum);
app.use("/api/v1/playlist", verifyTokenMiddleware, usePlaylist);
app.post(
  "/api/v1/entity/remove",
  verifyTokenMiddleware,
  removeEntity
);

app.use((req, _res, next) => {
  next(
    new apiError(404, "Route not found", {
      message: `Cannot find ${req.originalUrl} url`,
    })
  );
});

app.use(errorHandler);

