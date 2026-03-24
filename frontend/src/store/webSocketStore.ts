import { create } from "zustand";



type WebSocketType = {
    socket: WebSocket | null;
    message: string[];
    currentRoomId: string | null;
    actions: WebSocketActionType
}

type WebSocketActionType = {
    connect: ({ roomId, roomName, userId }: { roomId: string, roomName: string; userId: string }) => void;
    send: (message: string) => void;
}


export const useWebSocketStore = create<WebSocketType>((set, get) => ({
    socket: null,
    message: [],
    currentRoomId: null,
    actions: {
        connect: (({ roomId, roomName, userId }) => {
            const { socket, currentRoomId } = get();
            const url = process.env.NEXT_PUBLIC_WEBSOCKET_URL || "ws://localhost:8082"
            if (!socket) {
                const ws = new WebSocket(url);
                console.log(ws + "websocket connected")
                ws.onopen = (() => {
                    ws.send(JSON.stringify({
                        type: "JOIN_ROOM",
                        payload: {
                            roomId,
                            roomName,
                            userId
                        }
                    }))
                })
                ws.onclose = (ev => {
                    set({
                        socket: null,
                        currentRoomId: null
                    })
                })
                ws.onmessage = (event => {
                    console.log(event.data)
                    set({
                        message: [event.data]
                    })
                })

                ws.onerror = (error => {
                    console.error("socket connection error")
                })

                set({
                    socket: ws,
                    currentRoomId: roomId
                })
            } else {
                socket.send(JSON.stringify({
                    type: "SWITCH_ROOM",
                    payload: {
                        fromRoomId: currentRoomId,
                        toRoom: {
                            roomId,
                            roomName
                        },
                        userId,
                    }
                }))
                set({
                    currentRoomId: roomId
                })
            }

        }),
        send: ((message) => {
            const socket = get().socket;
            if (!socket) return;

            socket.send(JSON.stringify(message));
        })
    }
}))