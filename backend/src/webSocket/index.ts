import { joinRoomType, streamRoomType } from "../zodTypes/wsType";
import { WebSocket, WebSocketServer } from "ws";


export interface IRoomSocket {
    roomName: string
    roomId: string,
    socket: WebSocket[]

}

const roomSocket: IRoomSocket[] = []

const ws = new WebSocketServer({ port: 8000 }, () => {
    console.log("ws server is running on the port 8000")
})



ws.on("connection", (socket, req) => {
    const url = req.url;
    console.log("New connection:", url);


    socket.on("message", (msg) => {

        const message = JSON.parse(msg.toString());


        if (message.action === "join") {


            const { success, data } = joinRoomType.safeParse(message);

            if (!success) {
                socket.send("Provide the correct input")
                return;
            }
            // task 1 : check the user already part of the room

            const room = roomSocket.find(x => x.roomId === data.roomId);


            if (room) {

                if (!room.socket.includes(socket)) {
                    room.socket.push(socket);
                }
            } else {

                roomSocket.push({
                    roomId: data.roomId,
                    roomName: data.roomName,
                    socket: [socket]
                })

            }


        }

        if (message.action === "stream") {

            const { success, data } = streamRoomType.safeParse(message);


            if (!success) {

                socket.send("Provide the correct input for the stream")
                return;
            }

            const room = roomSocket.find(x => x.roomId === data.roomId);


            if (!room) {
                socket.send("Invalid input")
                return;
            }
            room.socket.forEach(x => {
                if (x !== socket) {
                    x.send(data.message);
                }
            })



        }

        if (message.action === "leave") {
            // delete it from the roomSocket array
        }






    })




});
