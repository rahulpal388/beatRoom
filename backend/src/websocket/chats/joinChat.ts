import { allConnection } from "../listenConnectionFn.js";
import z from "zod";
import WebSocket from "ws";


export const JoinChatType = z.object({
    type: z.literal("JOIN_CHAT"),
    payload: z.object({
        roomId: z.string(),
        roomName: z.string(),
        userId: z.string()
    })
})

export type IJoinChat = z.infer<typeof JoinChatType>;

export function joinChat(data: IJoinChat, socket: WebSocket) {
    if (!allConnection.has(data.payload.roomId)) {
        allConnection.set(data.payload.roomId, {
            members: [],
            curr_song: [],
            queueSong: []
        })
    }

    const room = allConnection.get(data.payload.roomId);
    if (room) {
        room.members.push({
            userId: data.payload.userId,
            socket
        })
        socket.send(JSON.stringify({
            message: `Joined ${data.payload.roomName}`
        }))
    }
}