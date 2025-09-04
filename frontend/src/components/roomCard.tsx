"use client"
import { IRoom } from "@/app/dashboard/[userId]/page";
import { Check, Copy, EllipsisVertical } from "lucide-react";
import { initScriptLoader } from "next/script";
import { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";



export function RoomCard({ name, link, createdAt }: IRoom) {
    const [roomName, setRoomName] = useState<string | null>(null);
    const [isCoped, setIsCoped] = useState<boolean>(false);

    return <>
        <div className="w-full h-[17rem] rounded-lg  grid grid-rows-5 bg-card-foreground  ">
            <div className=" row-span-3 h-full w-full   ">
                {/* <Image src="/beatroom-music.jpg" alt="image" fill className="object-contain w-full h-auto " /> */}
                <img src="/beatroom-music.jpg" alt="image" className="object-cover h-full w-full rounded-lg " />
            </div>

            <div className="relative row-span-2 px-4 py-2   ">
                <div className="flex  justify-between">
                    <h1 className="text-xl">{name}</h1>
                    <p className="text-xs">Created At {new Date(createdAt).toLocaleTimeString()}</p>
                </div>


                <div className=" absolute bottom-4 flex items-center justify-between ">
                    <div className="flex gap-4">
                        <Button btnType="Secondary" name="Join Room" onClick={() => {
                            console.log("join room")
                        }} />
                        <Button btnType="Primary" name="Delete"
                            onClick={() => {
                                console.log("delete")
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    </>

}
