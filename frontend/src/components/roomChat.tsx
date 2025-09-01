"use client"
import { Dispatch, SetStateAction, useState } from "react"
import { Chat } from "./chat"
import { SongQue } from "./songQue"
import { AskAI } from "./askAi"


type IChat = "Chat" | "Song Que" | "Ask AI"

const btn: IChat[] = ["Chat", "Song Que", "Ask AI"]

export function RoomChat() {
    const [chatType, setChatType] = useState<IChat>("Chat")

    return <>
        <div >
            <div className="flex gap-4 border-b-[1.5px] border-border px-4 py-2 ">
                {btn.map((x, i) => (
                    <RoundedBtn key={i} name={x} setChatType={setChatType} />
                ))}
            </div>
            <div>
                {chatType === "Chat" && <Chat />}
                {chatType === "Song Que" && <SongQue />}
                {chatType === "Ask AI" && <AskAI />}
            </div>
        </div>
    </>

}


function RoundedBtn({ name, setChatType }: {
    name: IChat,
    setChatType: Dispatch<SetStateAction<IChat>>
}) {

    return <div className="cursor-pointer px-2 py-1 rounded-xl text-sm border-[1.5px] border-border "
        onClick={() => {
            setChatType(name)
        }}
    >
        {name}
    </div>

}

