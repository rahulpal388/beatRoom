import { wss } from "index.js"
import { env } from "../zodTypes/envType.js"
import { Server, WebSocketServer } from "ws"
import { listenConnectionFn } from "./listenConnectionFn.js"

export function StartWebSocketServer(): Server {
    try {

        const wss = new WebSocketServer({ port: env.WSS_PORT }, () => {
            console.log(`Web socket server is started on port ${env.WSS_PORT}.......... `)
        })


        wss.on("connection", listenConnectionFn);

        return wss;

    } catch (error) {
        console.log("Error starting websocket")
        process.exit(1);
    }

}





