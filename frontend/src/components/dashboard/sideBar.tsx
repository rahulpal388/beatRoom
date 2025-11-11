'use client'
import { PanelLeftOpen, PanelRightOpen } from "lucide-react";
import { useState } from "react"



export function SideBar() {
    const [sideBarOpen, setSideBarOpen] = useState<boolean>(true);
    return (
        <div className={`dark:bg-card h-full ${sideBarOpen ? "w-[12rem]" : "w-[3rem]"} `}>
            <div className=" flex items-center justify-end ">

                {
                    sideBarOpen ? (

                        <PanelRightOpen onClick={() => setSideBarOpen(false)} />
                    ) : (

                        <PanelLeftOpen onClick={() => { setSideBarOpen(true) }} />
                    )
                }
            </div>
        </div>
    )
}