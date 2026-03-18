import WebSocket from "ws";
import http from "http"
import z from "zod";
import { joinChat, JoinChatType } from "./chats/joinChat.js";
import { chatFn, ChatType } from "./chats/chat.js";

export const ClientMessageType = z.discriminatedUnion("type", [JoinChatType, ChatType])

export type ClientMessage = z.infer<typeof ClientMessageType>

export type ConnectionType = {
    members: {
        userId: string;
        socket: WebSocket;
    }[],
    curr_song: {
        songId: string;
        position: number;
        startedAt: Date;
    }[],
    queueSong: string[]
}



export const allConnection = new Map<string, ConnectionType>();

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

        if (data.type === 'JOIN_CHAT') {
            joinChat(data, socket);
            return;
        }
        if (data.type === "SEND_MESSAGE") {
            chatFn(data);
            return;
        }

    })

}