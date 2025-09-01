"use client"

import { NavBar } from "@/components/navBar";
import { RoomChat } from "@/components/roomChat";
import { useParams } from "next/navigation"




export default function RoomPage() {
    const param = useParams();
    const roomId = param.roomId;
    const userId = param.userId


    return <>
        <div className="h-screen flex flex-col ">
            <div className="px-24 py-4  border-b-[1.5px]   border-border ">
                <NavBar />
            </div>
            <div className="grid grid-cols-8 flex-1 ">
                <div className="col-span-6 flex flex-col px-8 py-2 ">
                    <div className="flex">
                        <select className=" px-4 py-1 border-[1.5px] border-border rounded hover:bg-neutral-600  bg-foreground  " >

                            <option value="option1" >option1</option>
                            <option value="option2">option2</option>
                            <option value="option3">option3</option>
                            <option value="option4">option4</option>
                        </select>
                    </div>
                    <div className="flex flex-1 justify-between  bg-red-400 mt-4 ">
                        <div className="  w-[25rem] bg-neutral-500 h-full flex items-center justify-center  ">
                            video streaming later
                        </div>
                        <div className=" h-[18rem] w-[32rem] bg-neutral-800 flex items-center justify-center "> video play</div>
                    </div>
                </div>
                <div className="col-span-2 border-l-[1.5px] border-border  ">
                    <RoomChat />
                </div>
            </div>

        </div>
    </>

}