"use client";
import { MusicPlayer } from "@/components/dashboard/music/musicPlayer";
import { MusicSection } from "@/components/dashboard/music/musicSection";
import { useAuth } from "@/context/authContext";
import { CurrentSongConttextProvider } from "@/context/currentSong";
import { QueueProvider } from "@/context/queueContext";
import { SideBarContextProvider } from "@/context/sidebarContext";
import {
  Bell,
  GitPullRequestDraft,
  Handshake,
  HousePlus,
  LogOut,
  Music,
} from "lucide-react";

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

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-14 h-14 border-2 border-t-blue-800  border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <CurrentSongConttextProvider>
        <SideBarContextProvider>
          <QueueProvider>
            <div >
              <MusicPlayer />
              <div className=" w-screen h-screen ">
                <div className=" h-12  dark:bg-foreground dark:shadow-2xl w-full flex justify-end items-center gap-4 px-8 ">
                  <div className=" flex flex-col items-center justify-end ">
                    <h1 className=" text-sm ">{currentUser?.username}</h1>
                    <p className=" text-[10px] ">{currentUser?.userId}</p>
                  </div>
                  <div className="font-bold bg-green-700 size-9 rounded-full shadow-2xl flex items-center justify-center ">
                    {currentUser?.username[0].toLocaleUpperCase()}
                  </div>
                </div>
                <div className="h-[calc(100%-3rem)]  ">
                  <MusicSection />
                </div>
              </div>
            </div>
          </QueueProvider>
        </SideBarContextProvider>
      </CurrentSongConttextProvider>
    </>
  );
}
