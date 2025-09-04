'use client'

import { NavBar } from "@/components/navBar";
import { RoomCard } from "@/components/roomCard";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { CreateRoomCard } from "@/components/createRoomCard";
import { JoinRoomCard } from "@/components/joinRoomCard";
import axios from "axios";
import { useRouter } from "next/navigation";
import { div } from "motion/react-client";


export type IRoom = {
    name: string,
    link: string,
    createdAt: Date
}





export default function DashBoardPage() {

    const [isCreatRoom, setCreateRoom] = useState<boolean>(false)
    const [isJoinRoom, setJoinRoom] = useState<boolean>(false)
    const [rooms, setRooms] = useState<IRoom[]>([])
    const param = useParams();
    const userId = param.userId
    const router = useRouter()




    useEffect(() => {
        const token = localStorage.getItem("token")

        // if token continue and if not rediret to main page

        if (!token) {

            router.push("/")
            return;
        }

        axios.get(`http://localhost:8080/api/v1/room/get_rooms`, {
            headers: {
                Authorization: `Bearear ${token}`
            }
        }).then(response => {
            setRooms(response.data.rooms)
            console.log(response.data.rooms);
        })






    }, [])

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
            <div className=" -z-40  mt-12">
                {rooms.length === 0 ? (
                    <div>
                        <h1 className="text-3xl text-center">No Room found</h1>
                    </div>
                )
                    :
                    (<div className=" flex-1 grid  md:grid-cols-3 sm:grid-cols-2 gap-4 ">
                        {rooms.map((x, i) => (<RoomCard key={i} name={x.name} link={x.link} createdAt={x.createdAt} />))}
                    </div>
                    )
                }
            </div>
        </div>

    </>

}