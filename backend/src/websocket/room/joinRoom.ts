import { allConnection } from "../listenConnectionFn.js";
import z from "zod";
import WebSocket from "ws";


export const JoinRoomType = z.object({
    type: z.literal("JOIN_ROOM"),
    payload: z.object({
        roomId: z.string(),
        roomName: z.string(),
        userId: z.string()
    })
})

export type IJoinRoom = z.infer<typeof JoinRoomType>;

export function joinRoom(data: IJoinRoom, socket: WebSocket) {
    console.log(data)
    if (!allConnection.has(data.payload.roomId)) {
        allConnection.set(data.payload.roomId, {
            members: new Map(),
            currSong: null,
            queueSong: []
        })
    }

    const room = allConnection.get(data.payload.roomId);
    if (room) {
        room.members.set(data.payload.userId, socket)
        socket.send(JSON.stringify({
            message: `Joined ${data.payload.roomName}`
        }))
    }
    console.log(allConnection)
}