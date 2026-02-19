import createRoom from "../controllers/room/createRoom.js";
import { Router } from "express";
import { getRooms } from "../controllers/room/getRooms.js";

const roomRouter = Router();

// later add verification

roomRouter.post("/create", createRoom);
roomRouter.get("/get_rooms", getRooms);

export default roomRouter;
