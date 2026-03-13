"use client";

import { BottomSideBar } from "@/components/dashboard/bottomSideBar";
import { DashboardNavbar } from "@/components/dashboard/dashboardNavbar";
import { MusicBar } from "@/components/dashboard/music/MusicBar";
import { SideBar } from "@/components/dashboard/sideBar";
import { AudioCompoenent } from "@/components/dashboard/musicPlayerContext";
import React from "react";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className=" h-screen  flex flex-col    ">
        <DashboardNavbar />
        <div className=" relative flex flex-1  overflow-hidden ">
          <MusicBar />
          <BottomSideBar />
          <SideBar />
          <AudioCompoenent />
          <div className=" flex-1 overflow-y-auto   ">{children}</div>
        </div>
      </div>
    </>
  );
}
