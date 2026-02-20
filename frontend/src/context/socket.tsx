import { createContext, useContext, useEffect, useRef, useState } from "react";

type IWSContext = {
    isConnected: boolean,
    socket: WebSocket | null,
    sendMessage: (message: unknown) => void
}


const socketContext = createContext<IWSContext | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode, roomId: string }> = ({ children, roomId }) => {
    const [isConnected, setConnected] = useState<boolean>(false);
    const socketRef = useRef<WebSocket | null>(null)

    useEffect(() => {
        socketRef.current = new WebSocket("ws://localhost:8000");

        socketRef.current.onopen = () => {
            setConnected(true);
            console.log("ws connected");
            socketRef.current?.send(JSON.stringify({ type: "join", roomId }))
        }

        socketRef.current.onclose = () => {
            console.log("ws closed");
            setConnected(false);
        }

        socketRef.current.onerror = (e) => {
            console.log("ws error", e)
        }

        return () => {
            socketRef.current?.close();
        }


    }, [roomId])

    const sendMessage = (message: unknown) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify(message))
        } else {
            console.log("failed to send message")
        }
    }

    return <socketContext.Provider value={{ isConnected, socket: socketRef.current, sendMessage }}>
        {children}
    </socketContext.Provider>
}


export const useWebSocket = () => {
    const context = useContext(socketContext);
    if (!context) {
        throw new Error("useWebSocket must be use inside the WebSocketProvider");
    } else {
        return context;
    }

}