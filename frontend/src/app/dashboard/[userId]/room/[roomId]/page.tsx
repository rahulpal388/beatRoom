"use client"

import { NavBar } from "@/components/navBar";
import { RoomChat } from "@/components/roomChat";
import { Video } from "@/components/video";
import { Search } from "lucide-react";
import { useParams } from "next/navigation"




export default function RoomPage() {
    const param = useParams();
    const roomId = param.roomId;
    const userId = param.userId


    return <>
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
            <div className="grid grid-cols-8 flex-1 ">
                <div className="col-span-6 flex flex-col px-1 ">
                    <div className="grid grid-cols-6 flex-1    mt-4 ">
                        <div className=" col-span-3   bg-neutral-500 h-full flex items-center justify-center  ">
                            video streaming later
                        </div>
                        <div className="col-span-3 h-[18rem]  bg-neutral-800 flex items-center justify-center ">
                            <Video />
                        </div>
                    </div>
                </div>
                <div className="col-span-2 border-l-[1.5px] border-border  ">
                    <RoomChat />
                </div>
            </div>

        </div>
    </>

}