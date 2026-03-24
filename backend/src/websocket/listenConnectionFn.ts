import WebSocket from "ws";
import http from "http"
import z from "zod";
import { joinRoom, JoinRoomType } from "./room/joinRoom.js";
import { chatFn, ChatType } from "./room/chat.js";
import { switchRoom, SwitchRoomType } from "./room/switchRoom.js";

export const ClientMessageType = z.discriminatedUnion("type", [JoinRoomType, ChatType, SwitchRoomType])

export type ClientMessage = z.infer<typeof ClientMessageType>

export type RoomConnection = {
    members: Map<string, WebSocket>
    currSong: {
        songId: string
        position: number
        startedAt: Date
    } | null
    queueSong: string[]
}


export const allConnection = new Map<string, RoomConnection>();

export function listenConnectionFn(socket: WebSocket, req: http.IncomingMessage) {

    socket.on("message", (message) => {
        const { success, data } = ClientMessageType.safeParse(JSON.parse(message.toString()));
        if (!success) {
            socket.send(JSON.stringify({
                message: "Invliad data",
                success: false
            }))
            return;
        }
        console.log(data)

        if (data.type === "JOIN_ROOM") {
            joinRoom(data, socket);
            return;
        }
        if (data.type === "SEND_MESSAGE") {
            chatFn(data);
            return;
        }
        if (data.type === "SWITCH_ROOM") {
            switchRoom(data, socket);
            return;
        }

    })

}