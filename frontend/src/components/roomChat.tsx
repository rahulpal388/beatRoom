"use client"
import { Dispatch, SetStateAction, useState } from "react"
import { Chat } from "./chat"
import { SongQue } from "./songQue"
import { AskAI } from "./askAi"
import { Button } from "./ui/button"
import { BotMessageSquare, ListMusic, MessageCircle, PanelLeftClose, PanelRightClose } from "lucide-react"


type IChat = "Chat" | "Queue" | "AI"

const btn: IChat[] = ["Chat", "Queue", "AI"]

export function RoomChat({ setIsOpen, isOpen }: {
    setIsOpen: Dispatch<SetStateAction<boolean>>
    isOpen: boolean
}) {
    const [chatType, setChatType] = useState<IChat>("Chat")
    const [isChat, setIsChat] = useState<boolean>(false);


    return <>
        <div className={`bg-card-foreground text-white flex flex-col h-full  `} >
            <div className={`flex gap-4  items-center justify-center border-b-[1.5px]  border-border  py-2 overflow-hidden ${!isOpen && "flex-col"}`}>
                {isOpen ?
                    <PanelRightClose className=" cursor-pointer " onClick={() => { setIsOpen(prev => prev = !prev) }} />
                    :
                    <PanelLeftClose className="cursor-pointer  " onClick={() => setIsOpen(prev => prev = !prev)} />
                }

                <div >
                    {isOpen ?
                        <div className="flex gap-4">
                            {btn.map((x, i) => (
                                <Button key={i} btnType="Secondary" name={x} className="text-sm " onClick={() => setChatType(x)} />
                            ))}
                        </div>
                        :
                        <div className="flex gap-4 flex-col mt-6 ">
                            <MessageCircle className={`stroke-red-900 cursor-pointer`} onClick={() => {
                                setIsOpen(true);
                                setChatType("Chat")
                            }} />
                            <ListMusic className={`stroke-red-900  cursor-pointer `} onClick={() => {
                                setIsOpen(true)
                                setChatType("Queue")
                            }} />
                            <BotMessageSquare className={`stroke-red-900  cursor-pointer `} onClick={() => {
                                setIsOpen(true)
                                setChatType("AI")
                            }} />
                        </div>

                    }
                </div>
            </div>
            <div className={`flex-1  ${!isOpen && "hidden"}`}>
                {chatType === "Chat" && <Chat />}
                {chatType === "Queue" && <SongQue />}
                {chatType === "AI" && <AskAI />}
            </div>
        </div>
    </>

}




