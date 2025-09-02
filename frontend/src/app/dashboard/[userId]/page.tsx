'use client'

import { NavBar } from "@/components/navBar";
import { RoomCard } from "@/components/roomCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation"
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { CreateRoomCard } from "@/components/createRoomCard";
import { JoinRoomCard } from "@/components/joinRoomCard";



export type IRoom = {
    name: string,
    link: string,
    createdAt: Date
}

const rooms: IRoom[] = [
    { name: "Chill Vibes", link: "https://beatroom.com/room/abc123", createdAt: new Date("2025-09-01T18:30:00Z") },
    { name: "LoFi Beats", link: "https://beatroom.com/room/def456", createdAt: new Date("2025-09-01T17:45:00Z") },
    { name: "Hip Hop Zone", link: "https://beatroom.com/room/ghi789", createdAt: new Date("2025-09-01T17:00:00Z") },
    { name: "EDM Party", link: "https://beatroom.com/room/jkl012", createdAt: new Date("2025-09-01T16:30:00Z") },
    { name: "Rock Classics", link: "https://beatroom.com/room/mno345", createdAt: new Date("2025-09-01T15:45:00Z") },
    { name: "Jazz Night", link: "https://beatroom.com/room/pqr678", createdAt: new Date("2025-09-01T15:00:00Z") },
    { name: "Pop Hits", link: "https://beatroom.com/room/stu901", createdAt: new Date("2025-09-01T14:30:00Z") },
    { name: "Metal Madness", link: "https://beatroom.com/room/vwx234", createdAt: new Date("2025-09-01T13:45:00Z") },
    { name: "Indie Chill", link: "https://beatroom.com/room/yz567", createdAt: new Date("2025-09-01T13:00:00Z") },
    { name: "Classical Evening", link: "https://beatroom.com/room/abc890", createdAt: new Date("2025-09-01T12:30:00Z") },
];



export default function DashBoardPage() {

    const [isCreatRoom, setCreateRoom] = useState<boolean>(false)
    const [isJoinRoom, setJoinRoom] = useState<boolean>(false)
    const param = useParams();
    const userId = param.userId

    return <>
        <div className="md:px-24 sm:px-12 px-6 flex flex-col text-white   " >

            <AnimatePresence>
                {isCreatRoom && <CreateRoomCard setCreateRoom={setCreateRoom} />}
                {isJoinRoom && <JoinRoomCard setJoinRoom={setJoinRoom} />}
            </AnimatePresence>



            <div className=" py-4 flex items-center justify-between ">
                <h1 className="text-xl  text-red-800 font-extrabold  ">BeatRoom</h1>
                <Button btnType="Primary" name="Login" onClick={() => {
                    console.log("/login")
                }} />

            </div>
            <div>
                <div className="flex gap-4 justify-end  mt-10 ">
                    <button className=" cursor-pointer flex items-center gap-1 border-[0.5px] border-white px-4 py-2 rounded  "

                        onClick={() => {
                            setCreateRoom(true)
                        }}
                    >
                        <Plus />
                        <span>Create room</span>
                    </button>
                    <button className="cursor-pointer font-semibold bg-primary text-primary-foreground rounded px-4 py-1 shadow-2xl shadow-background "
                        onClick={() => {
                            setJoinRoom(true)
                        }}
                    >Join room</button>
                </div>
            </div>
            <div className=" -z-40 mt-12">
                <div className=" flex-1 grid  md:grid-cols-3 sm:grid-cols-2 gap-4 ">
                    {rooms.map((x, i) => (<RoomCard key={i} name={x.name} link={x.link} createdAt={x.createdAt} />))}
                </div>
            </div>
        </div>

    </>

}