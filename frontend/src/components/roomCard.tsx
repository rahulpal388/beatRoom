"use client"
import { IRoom } from "@/app/dashboard/[userId]/page";
import { Check, Copy, EllipsisVertical } from "lucide-react";
import { initScriptLoader } from "next/script";
import { useState } from "react";



export function RoomCard({ name, link, createdAt }: IRoom) {
    const [roomName, setRoomName] = useState<string | null>(null);
    const [isCoped, setIsCoped] = useState<boolean>(false);

    return <>
        <div className=" relative border-[1px] border-border p-2  rounded-md flex justify-between items-center  ">
            <div>
                <h1 className="text-xl">{name}</h1>
                <p className="text-xs mt-2 ">Created At {createdAt.toLocaleDateString()} </p>
            </div>
            <div className="flex gap-6 items-center cursor-pointer ">
                {isCoped ?
                    <Check />
                    : <Copy onClick={async () => {
                        await navigator.clipboard.writeText(link);
                        setIsCoped(true);
                        setTimeout(() => {
                            setIsCoped(false);
                        }, 2000)

                    }} />}
                <EllipsisVertical className="hover:bg-gray-600 h-12 rounded cursor-pointer " onClick={(e) => {

                    setRoomName(roomName === name ? null : name)
                    console.log(e)
                }} />
            </div>

            {roomName === name && <div className="z-50 absolute -right-28 flex flex-col gap-2 top-8 h-20 w-30 bg-gray-600 rounded p-2 ">
                <button className="hover:bg-neutral-500 w-full rounded " >Copy</button>
                <button className="hover:bg-neutral-500 w-full rounded " >Delete</button>

            </div>}
        </div>

    </>

}
