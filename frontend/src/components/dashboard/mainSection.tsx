import { TCurrentItem } from "@/app/dashboard/[userId]/page";
import { useAuth } from "@/context/authContext";
import { useState } from "react";
import { MusicSection } from "./music/musicSection";
import { Friends } from "./friends";
import { Rooms } from "./rooms";
import { Customize } from "./customize";
import { Notification } from "./notification";
import { useSideBar } from "@/context/sidebarContext";

export function MainSection() {
  const { currentUser } = useAuth();
  const { currentItem, setCurrentItem } = useSideBar();
  return (
    <>
      <div className="   h-screen   w-full  ">
        <div className=" h-12  dark:bg-foreground dark:shadow-2xl w-full flex justify-end items-center gap-4 px-8 ">
          <div className=" flex flex-col items-center justify-end ">
            <h1 className=" text-sm ">{currentUser?.username}</h1>
            <p className=" text-[10px] ">{currentUser?.userId}</p>
          </div>
          <div className="font-bold bg-green-700 size-9 rounded-full shadow-2xl flex items-center justify-center ">
            {currentUser?.username[0].toLocaleUpperCase()}
          </div>
        </div>
        <div className="h-[calc(100vh-3rem)]  ">
          {currentItem === "Music" && <MusicSection />}
          {currentItem === "Friends" && <Friends />}
          {currentItem === "Rooms" && <Rooms />}
          {currentItem === "Notification" && <Notification />}
          {currentItem === "Customize" && <Customize />}
        </div>
      </div>
    </>
  );
}
