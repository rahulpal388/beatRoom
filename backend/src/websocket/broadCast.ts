import { allConnection } from "./listenConnectionFn.js";




export function broadcast(roomId: string, senderId: string, message: string) {

    const reciverClient = allConnection.get(roomId)?.members.filter(member => member.userId !== senderId) ?? [];
    reciverClient.forEach(reciver => {
        reciver.socket.send(message);
    })
}