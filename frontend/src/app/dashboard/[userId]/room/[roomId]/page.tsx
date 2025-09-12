"use client";

import { NavBar } from "@/components/navBar";
import { RoomChat } from "@/components/roomChat";
import { YTVideo } from "@/components/song/video";
import { VideoChat } from "@/components/video/videoChat";
import { WebSocketProvider } from "@/context/socket";
import { PanelLeftClose, PanelRightClose, Search, Video } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function RoomPage() {
    const [isChat, setIsChat] = useState<boolean>(false);
    const [isVideoChat, setIsVideoChat] = useState<boolean>(false);
    const param = useParams();
    const roomId = param.roomId!.toString();
    const userId = param.userId;

    return (
        <>
            <WebSocketProvider roomId={roomId}>
                <div className="h-screen  flex flex-col   ">
                    <div className="md:px-24 px-2 py-4 max-md:h-36 h-20  border-b-[0.15px]   border-border flex items-center justify-between  ">
                        <div className="flex lg:gap-12 gap-4  max-md:flex-col items-center lg:justify-end justify-center max-lg:px-6 w-full   ">
                            <h1 className="md:text-xl text-sm  text-red-800 font-extrabold  ">
                                BeatRoom
                            </h1>
                            <div className="border-[0.5px] md:w-96  w-full   border-white rounded-lg flex items-center justify-center h-10 pr-4 bg-card-foreground ">
                                <input
                                    type="text"
                                    name="search"
                                    id="search"
                                    placeholder="Search....."
                                    className="outline-none px-2  text-white w-full  "
                                />
                                <Search className="stroke-white border-l-[0.5px] border-white h-full   pl-2 size-8 " />
                            </div>

                            <div className="md:hidden bg-neutral-800 rounded text-neutral-100 px-4 py-2   z-50 w-full h-12 flex items-center justify-center gap-4                      ">
                                <button
                                    className="border-[1px]  cursor-pointer  px-4 py-1 rounded-lg  "
                                    onClick={() => {
                                        setIsChat(false);
                                        setIsVideoChat(prev => prev = !prev)

                                    }}
                                >
                                    Video
                                </button>

                                <button
                                    className="border-[1px] cursor-pointer px-4 py-1 rounded-lg  "
                                    onClick={() => {
                                        setIsVideoChat(false);
                                        setIsChat(prev => prev = !prev);
                                    }}
                                >
                                    Chats
                                </button>

                            </div>

                            <select className=" max-md:hidden h-10 px-4 py-1 border-[1.5px] border-border rounded text-white hover:bg-neutral-600  bg-foreground  ">
                                <option value="option1">Option1</option>
                                <option value="option2">Option2</option>
                                <option value="option3">Option3</option>
                                <option value="option4">Option4</option>
                            </select>
                            <div className=" max-md:hidden size-12 rounded-full text-white flex items-center justify-center font-bold text-2xl bg-card-foreground ">
                                R
                            </div>
                        </div>
                    </div>

                    <div className=" max-md:h-[calc(100%-144px)] h-[calc(100%-80px)]    flex ">
                        <div className=" relative flex-1 h-full flex items-center justify-center  ">
                            <div className={`flex-1  flex  h-full  ${isVideoChat ? " z-50 block max-md:absolute w-full " : "max-md:hidden "} `}>
                                {/* max-md:absolute max-md:w-full max-md:z-50  max-md:bg-green-400 */}
                                <div className="w-12 h-full bg-red-200 max-md:hidden  "></div>
                                <VideoChat />
                            </div>
                            <div className="flex flex-2  h-full  ">
                                <YTVideo />
                            </div>
                        </div>
                        <div
                            className={`md:min-w-10   md:w-72  ${isChat ? " max-md:h-[calc(100%-144px)] z-50 block max-md:absolute w-full " : "max-md:hidden  "}   }  `}
                        >
                            <RoomChat />
                        </div>
                    </div>
                </div>
            </WebSocketProvider>
        </>
    );
}
