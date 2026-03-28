import { createRoom } from "../controllers/room/createRoom.js";
import { getRooms } from "../controllers/room/getRooms.js";
import { Router } from "express";



export const roomRouter = Router();


roomRouter.post("/create", createRoom)


roomRouter.get("/", getRooms);