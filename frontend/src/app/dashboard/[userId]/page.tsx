'use client'

import { Customize } from "@/components/dashboard/customize"
import { Friends } from "@/components/dashboard/friends"
import { Musics } from "@/components/dashboard/music"
import { Notification } from "@/components/dashboard/notification"
import { Rooms } from "@/components/dashboard/rooms"
import { Bell, GitPullRequestDraft, Handshake, HousePlus, Music, PanelLeftClose, PanelRightClose } from "lucide-react"
import React, { useState } from "react"




export type IRoom = {
    name: string,
    link: string,
    createdAt: Date
}


type TSideBarItems = {
    name: string,
    logo: React.ReactNode,
    link: TCurrentItem
}

const sideBarItems: TSideBarItems[] = [
    {
        name: "Music",
        logo: <Music className="xl:size-4  " />,
        link: "Music"
    },
    {
        name: "Rooms",
        logo: <HousePlus className="xl:size-4 " />,
        link: "Rooms"
    },
    {
        name: "Friends",
        logo: <Handshake className="xl:size-4 " />,
        link: "Friends"
    },
    {
        name: "Notification",
        logo: <Bell className="xl:size-4 " />,
        link: "Notification"
    },
    {
        name: "Customize",
        logo: <GitPullRequestDraft className="xl:size-4 " />,
        link: "Customize"
    }
]

type TCurrentItem = "Music" | "Rooms" | "Friends" | "Notification" | "Customize"


export default function DashBoardPage() {
    const [isSideWindow, setSideWindow] = useState<boolean>(true);
    const [currentItem, setCurrentItem] = useState<TCurrentItem>("Music");




    return <>
        <div className=" flex h-screen   " >
            <div className={` max-md:hidden   py-2  dark:shadow-2xl ${isSideWindow ? " xl:w-[12rem] px-4 " : "w-20 px-2 "} `}>
                <div className="flex justify-end ">
                    {isSideWindow ?
                        <PanelLeftClose className=" cursor-pointer size-6 "
                            onClick={() => {
                                setSideWindow(false);
                            }}
                        />
                        :
                        <PanelRightClose className=" cursor-pointer size-6 "
                            onClick={() => {
                                setSideWindow(true);
                            }}
                        />
                    }
                </div>
                <div className=" mt-20 flex flex-col gap-2 ">
                    {sideBarItems.map((items, index) => (
                        <div key={index} className={` px-4 py-2 rounded flex items-center gap-4   cursor-pointer  ${currentItem === items.link ? " bg-primary dark:bg-primary " : "dark:hover:bg-accent-foreground "} `}
                            onClick={() => { setCurrentItem(items.link) }}
                        >
                            {items.logo}

                            <h1 className={`xl:text-xl ${!isSideWindow && "hidden"} `} >{items.name}</h1>


                        </div>
                    ))}
                </div>
            </div>
            <div className="   h-screen   w-full  ">
                <div className=" h-12  dark:bg-foreground dark:shadow-2xl w-full  ">

                </div>
                <div className="h-[calc(100vh-3rem)]  ">
                    {currentItem === "Music" && <Musics />}
                    {currentItem === "Friends" && <Friends />}
                    {currentItem === "Rooms" && <Rooms />}
                    {currentItem === "Notification" && <Notification />}
                    {currentItem === "Customize" && <Customize />}
                </div>
            </div>

        </div>

    </>

}