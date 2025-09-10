import { Send } from "lucide-react";
import { Input } from "./ui/input";
import React, { useRef, useState } from "react";
import { div } from "motion/react-client";
import Preview from "react-player/Preview";

type TChats = {
    username: string,
    message: string
}

export function Chat() {
    const [chats, setChats] = useState<TChats[]>([])
    const inputRef = useRef<HTMLInputElement>(null)


    return <>

        <div className="grid grid-rows-12  h-full ">
            <div className=" row-span-11 relative  overflow-y-scroll   ">
                {!chats ?
                    <div className="flex justify-center items-center text-xl text-neutral-500 h-full  ">
                        No Message  Yet
                    </div>
                    :
                    <div className=" absolute bottom-0 left-0 px-px  ">
                        {chats.map((x, i) => (
                            <div key={i} className="flex gap-4 items-center  " >
                                <h1 className="text-md">{x.username}</h1>
                                <p className=" text-xs " >{x.message}</p>
                            </div>
                        ))}
                    </div>
                }
            </div>
            <div className="row-span-1  bottom-0 left-0 w-full h-10 border-t-[1px] border-border px-px py-px  ">
                <div className="flex h-full items-center justify-left gap-4 border-[1px] rounded-sm border-border overflow-hidden ">
                    <div>
                        <input ref={inputRef} type="text" id="message" placeholder="send message.........." className="  outline-none rounded px-2   " autoComplete="off" />
                    </div>
                    <div className=" hover:bg-neutral-800 cursor-pointer border-l-[1px] border-border h-full  flex items-center justify-center  w-full  "

                        onClick={() => {
                            if (!inputRef.current) {
                                return;
                            }
                            const message = inputRef.current.value;
                            setChats(prev => [...prev, { username: "rahul", message: message }])
                        }}
                    >
                        <Send />
                    </div>
                </div>
            </div>
        </div>
    </>

}

