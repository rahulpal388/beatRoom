import { Send } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useWebSocket } from "@/context/socket";
import { useParams } from "next/navigation";

export type TChats = {
    username: string,
    message: string
}

export function Chat() {
    const [chats, setChats] = useState<TChats[]>([])
    const inputRef = useRef<HTMLInputElement>(null);
    const param = useParams();
    const username = param.userId?.toString();
    const roomId = param.roomId?.toString();
    const { socket, sendMessage } = useWebSocket();

    useEffect(() => {
        if (!socket) {
            return;
        }

        const handleMesssage = (e: MessageEvent) => {
            console.log("from chat")
            const data = JSON.parse(e.data);
            console.log(data)
            if (data.type === "chat") {
                setChats(prev => [...prev, { username: data.username, message: data.message }])

            }
        }

        socket.addEventListener("message", handleMesssage)


        return () => {
            socket.removeEventListener("message", handleMesssage)
        }
    }, [socket])


    return <>

        <div className="grid grid-rows-12  h-full ">
            <div className=" row-span-11 relative  overflow-y-scroll   ">
                {chats.length === 0 ?
                    <div className="flex justify-center items-center text-xl text-neutral-500 h-full  ">
                        No Message  Yet
                    </div>
                    :
                    <div className=" absolute bottom-0 left-0 px-px pl-1 pb-4 flex flex-col gap-2 ">
                        {chats.map((x, i) => (
                            <div key={i} className="flex gap-2 items-center   " >
                                <h1 className="text-md rounded px-1 bg-neutral-800  ">{x.username}</h1>
                                <p className=" text-sm " >{x.message}</p>
                            </div>
                        ))}
                    </div>
                }
            </div>
            <div className="row-span-1  bottom-0 left-0 w-full  h-10 border-t-[1px] border-border px-2 py-px  ">
                <div className="flex h-full items-center   gap-4 border-[1px] rounded-sm border-border overflow-hidden ">
                    <div className="flex-1">
                        <input ref={inputRef} type="text" id="message" placeholder="send message.........." className="  outline-none rounded px-2  flex-1 " autoComplete="off" />
                    </div>
                    <div className=" w-12  hover:bg-neutral-800 cursor-pointer border-l-[1px] border-border h-full  flex items-center justify-center   "

                        onClick={() => {
                            if (!inputRef.current) {
                                return;
                            }
                            const message = inputRef.current.value;
                            console.log({
                                type: "chat",
                                username,
                                roomId,
                                message
                            })
                            sendMessage({
                                type: "chat",
                                username,
                                roomId,
                                message
                            })
                            setChats(prev => [...prev, { username: username!, message: message }])
                        }}
                    >
                        <Send />
                    </div>
                </div>
            </div>
        </div>
    </>

}

