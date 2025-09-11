"use client"

import { NavBar } from "@/components/navBar";
import { RoomChat } from "@/components/roomChat";
import { Video } from "@/components/video";
import { WebSocketProvider } from "@/context/socket";
import { PanelLeftClose, PanelRightClose, Search } from "lucide-react";
import { useParams } from "next/navigation"
import { useState } from "react";




export default function RoomPage() {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const param = useParams();
    const roomId = param.roomId!.toString();
    const userId = param.userId




    return <>
        <WebSocketProvider roomId={roomId} >
            <div className="h-screen flex flex-col ">
                <div className="px-24 py-4  border-b-[0.15px]   border-border flex items-center justify-between  ">
                    <h1 className="text-xl  text-red-800 font-extrabold  ">BeatRoom</h1>
                    <div className="flex gap-12 items-center justify-end  ">
                        <div className="border-[0.5px] w-96 border-white rounded-lg flex items-center justify-center h-10 pr-4 bg-card-foreground ">
                            <input type="text" name="search" id="search" placeholder="Search....." className="outline-none px-2  text-white w-full  " />
                            <Search className="stroke-white border-l-[0.5px] border-white h-full   pl-2 size-8 " />
                        </div>
                        <select className="h-10 px-4 py-1 border-[1.5px] border-border rounded text-white hover:bg-neutral-600  bg-foreground  " >

                            <option value="option1" >Option1</option>
                            <option value="option2">Option2</option>
                            <option value="option3">Option3</option>
                            <option value="option4">Option4</option>
                        </select>
                        <div className="size-12 rounded-full text-white flex items-center justify-center font-bold text-2xl bg-card-foreground ">R</div>
                    </div>
                </div>

                <div className="bg-red-700 h-full flex ">
                    <div className=" flex-1 h-full flex items-center justify-center  ">
                        <div className="flex flex-1 h-full items-center justify-center bg-pink-600  ">
                            video Streaming
                        </div>
                        <div className="flex flex-1 h-full items-center justify-center bg-amber-500 ">
                            song Streaming
                        </div>
                    </div>
                    <div className={`bg-blue-600 min-w-10  h-full  ${isOpen ? "w-72" : "w-10"}  `}>
                        <RoomChat setIsOpen={setIsOpen} isOpen={isOpen} />
                    </div>


                </div>

            </div>
        </WebSocketProvider>
    </>

}