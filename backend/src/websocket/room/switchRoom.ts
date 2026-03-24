



import { allConnection } from "websocket/listenConnectionFn.js";
import z from "zod";
import WebSocket from "ws"

export const SwitchRoomType = z.object({
    type: z.literal("SWITCH_ROOM"),
    payload: z.object({
        fromRoomId: z.string(),
        toRoom: z.object({
            roomId: z.string(),
            roomName: z.string()
        }),
        userId: z.string()
    })
})

export type ISwitchRoom = z.infer<typeof SwitchRoomType>


export function switchRoom(data: ISwitchRoom, socket: WebSocket) {
    console.log(data)

    const room = allConnection.get(data.payload.fromRoomId)
    if (room) {
        room.members.delete(data.payload.userId);
    }

    const joiningRoom = allConnection.get(data.payload.toRoom.roomId);

    if (joiningRoom) {
        joiningRoom.members.set(data.payload.userId, socket);
    } else {
        allConnection.set(data.payload.toRoom.roomId,
            {
                members: new Map(),
                currSong: null,
                queueSong: []
            }
        )

        allConnection.get(data.payload.toRoom.roomId)?.members.set(data.payload.userId, socket)
    }

    socket.send(JSON.stringify({
        message: "room is siwtch"
    }))


}  