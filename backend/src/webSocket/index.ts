import { chatRoomType, joinRoomType } from "../zodTypes/wsType";
import { WebSocket, WebSocketServer } from "ws";
import Jwt from "jsonwebtoken";

export interface IRoomSocket {
    roomId: string,
    socket: WebSocket[]

}

const roomSocket: IRoomSocket[] = []

const ws = new WebSocketServer({ port: 8000 }, () => {
    console.log("ws server is running on the port 8000")
})



ws.on("connection", (socket, req) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    console.log("New connection:", token);

    try {

        // if (!token) {
        //     socket.send("No authorization token found ")
        //     return
        // }

        // const isValidToken = Jwt.verify(token, process.env.JWT_SECRET || "secret");
        const isValidToken = true;

        if (!isValidToken) {
            socket.send("Invalid token or token has been expired")
            socket.close();
        }
    } catch (error) {
        console.log("invalid token")
        socket.close()
    }


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
                    socket: [socket]
                })

            }


        }

        if (message.action === "chat") {
            console.log(`total number of rooms${roomSocket.length}`)

            const { success, data } = chatRoomType.safeParse(message);

            console.log(data)
            if (!success) {

                socket.send("Provide the correct input for the stream")
                return;
            }

            const room = roomSocket.find(x => x.roomId === data.roomId);


            if (!room) {
                socket.send("Invalid input")
                return;
            }
            console.log(`total number of member in a room ${room.socket.length}`)

            room.socket.forEach(x => {
                if (x !== socket) {
                    x.send(JSON.stringify({
                        type: "chat",
                        username: data.username,
                        message: data.message
                    }));
                }
            })



        }

        if (message.action === "leave") {
            // delete it from the roomSocket array
        }






    })

    socket.on("close", () => {

    })



});
