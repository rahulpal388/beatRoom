"use client";
import { MainSection } from "@/components/dashboard/mainSection";
import { MusicPlayer } from "@/components/dashboard/music/musicPlayer";
import { Sidebar } from "@/components/dashboard/sidebar";
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
  PanelLeftClose,
  PanelRightClose,
} from "lucide-react";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export type IRoom = {
  name: string;
  link: string;
  createdAt: Date;
};

type TSideBarItems = {
  name: string;
  logo: React.ReactNode;
  link: TCurrentItem;
};

export const sideBarItems: TSideBarItems[] = [
  {
    name: "Music",
    logo: <Music className="xl:size-6  " />,
    link: "Music",
  },
  {
    name: "Rooms",
    logo: <HousePlus className="xl:size-6 " />,
    link: "Rooms",
  },
  {
    name: "Friends",
    logo: <Handshake className="xl:size-6 " />,
    link: "Friends",
  },
  {
    name: "Notification",
    logo: <Bell className="xl:size-6  " />,
    link: "Notification",
  },
  {
    name: "Customize",
    logo: <GitPullRequestDraft className="xl:size-6 " />,
    link: "Customize",
  },
];

export type TCurrentItem =
  | "Music"
  | "Rooms"
  | "Friends"
  | "Notification"
  | "Customize";
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
  const { isAuthenticated } = useAuth();

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
            <div className=" flex h-screen   ">
              <MusicPlayer />
              <Sidebar />
              <MainSection />
            </div>
          </QueueProvider>
        </SideBarContextProvider>
      </CurrentSongConttextProvider>
    </>
  );
}
