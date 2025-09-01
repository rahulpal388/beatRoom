'use client'

import { NavBar } from "@/components/navBar";
import { RoomCard } from "@/components/roomCard";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation"



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


    const param = useParams();
    const userId = param.userId

    return <>
        <div className="px-24 flex flex-col   " >
            <div className=" py-4">
                <NavBar />
            </div>
            <div>
                <div className="flex gap-4 justify-end  mt-10 ">
                    <button className="flex items-center gap-1 border-[1.5px] border-primary px-4 py-2 rounded  ">
                        <Plus />
                        <span>Create room</span>
                    </button>
                    <button className=" font-semibold bg-primary text-primary-foreground rounded px-4 py-1 shadow-2xl shadow-background ">Join room</button>
                </div>
            </div>
            <div className="mt-12  flex items-center justify-center    ">
                <div className=" h-96 w-[50rem] bg-card text-card-foreground dark:text-card dark:bg-card-foreground border-[1px] border-border rounded p-12 overflow-x-scroll no-scrollbar flex flex-col gap-4 ">
                    {rooms.map((x, i) => (
                        < RoomCard key={i} name={x.name} createdAt={x.createdAt} link={x.link} />
                    ))}

                </div>
            </div>
        </div>

    </>

}