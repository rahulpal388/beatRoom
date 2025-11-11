"use client";
import { MusicBar } from "@/components/dashboard/music/MusicBar";
import { DisplaySongs } from "@/components/dashboard/music/MusicPages/displaySongs";
import { MusicPlayer } from "@/components/dashboard/music/musicPlayer";
import { SearchBar } from "@/components/dashboard/music/SearchBar";
import { SideBar } from "@/components/dashboard/sideBar";
import { useAuth } from "@/context/authContext";
import { CurrentSongConttextProvider } from "@/context/currentSong";
import { QueueProvider } from "@/context/queueContext";
import { SideBarContextProvider } from "@/context/sidebarContext";
import { Copy } from "lucide-react";

import React from "react";



export type TCurrentSong = {
  id: string;
  title: string;
  type: string;
  duration: number;
  artist: string;
  image: {
    quality: string;
    url: string;
  };
  downloadUrl: {
    quality: string;
    url: string;
  };
};

export default function DashBoardPage() {
  const { isAuthenticated, currentUser } = useAuth();

  // if (!isAuthenticated) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <div className="w-14 h-14 border-2 border-t-blue-800  border-gray-200 rounded-full animate-spin"></div>
  //     </div>
  //   );
  // }

  return (
    <>
      <CurrentSongConttextProvider>
        <SideBarContextProvider>
          <QueueProvider>
            <div className=" h-screen  flex    " >
              <MusicPlayer />
              <div className=" h-full max-lg:hidden ">
                <SideBar />
              </div>
              <div className=" flex-1 flex flex-col min-w-0 ">
                <div className="  h-12 border-b-[0.5px] border-muted/20  dark:shadow-2xl  flex justify-between items-center gap-4 px-8  ">
                  <div>
                    <h1 className=" text-xl  font-extralight italic ">beatRoom</h1>
                  </div>
                  <div className=" relative flex items-center gap-4 justify-end max-md:hidden  ">
                    <SearchBar />
                  </div>
                  <div className=" flex gap-12 ">
                    <button className=" cursor-pointer dark:shadow-xl dark:bg-card px-2 py-1 rounded text-muted flex gap-2 items-center ">
                      Invite friends
                      <Copy size={14} />
                    </button>
                    <div className="flex gap-4">
                      <div className=" flex flex-col items-center justify-end ">
                        <h1 className=" text-sm ">{currentUser?.username}</h1>
                        <p className=" text-[10px] ">{currentUser?.userId}</p>
                      </div>
                      <div className="font-bold bg-green-700 size-9 rounded-full shadow-2xl flex items-center justify-center ">
                        {currentUser?.username[0].toLocaleUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="  flex-1 overflow-y-auto  ">
                  <MusicBar />
                  <DisplaySongs />

                </div>
              </div>
            </div>
          </QueueProvider>
        </SideBarContextProvider>
      </CurrentSongConttextProvider>
    </>
  );
}
