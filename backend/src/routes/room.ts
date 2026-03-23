import { addMessage } from "../controllers/room/addMessage.js";
import { createRoom } from "../controllers/room/createRoom.js";
import { getMessages } from "../controllers/room/getMessages.js";
import { getRooms } from "../controllers/room/getRooms.js";
import { Router } from "express";



export const roomRouter = Router();


roomRouter.post("/create", createRoom)
roomRouter.post("/message", addMessage)
roomRouter.get("/message", getMessages)


roomRouter.get("/", getRooms);