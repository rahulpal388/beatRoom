"use client"

import { useParams } from "next/navigation"




export default function RoomPage() {
    const param = useParams();
    const roomId = param.roomId;
    const userId = param.userId


    return <>
        <div className="text-white">
            <h1>the userId is {userId}</h1>
            <h1>The room is is {roomId}</h1>

        </div>
    </>

}