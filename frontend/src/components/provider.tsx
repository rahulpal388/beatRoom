"use client";

import { GlobalPopoverProvider } from "@/context/globalPopover";
import { MusicPlayerProvider } from "@/context/musicPlayerContext";
import { PopoverContextProvider } from "@/context/popover";
import { QueueProvider } from "@/context/queueContext";
import React from "react";
import { DashboardNavbar } from "./dashboard/dashboardNavbar";
import { MusicBar } from "./dashboard/music/MusicBar";
import { BottomSideBar } from "./dashboard/bottomSideBar";
import { SideBar } from "./dashboard/sideBar";
import { ModalContextProvider } from "@/context/modalContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <QueueProvider>
        <GlobalPopoverProvider>
          <PopoverContextProvider>
            <MusicPlayerProvider>
              <ModalContextProvider>
                <div className=" h-screen  flex flex-col    ">
                  <DashboardNavbar />
                  <div className=" relative flex flex-1  overflow-hidden ">
                    <MusicBar />
                    <BottomSideBar />
                    <SideBar />
                    <div className=" flex-1 overflow-y-auto   ">{children}</div>
                  </div>
                </div>
              </ModalContextProvider>
            </MusicPlayerProvider>
          </PopoverContextProvider>
        </GlobalPopoverProvider>
      </QueueProvider>
    </>
  );
}
