"use client";
import { BottomSideBar } from "@/components/dashboard/bottomSideBar";
import { MusicBar } from "@/components/dashboard/music/MusicBar";
import { ShowPopover } from "@/components/dashboard/options/showOptions";
import { SideBar } from "@/components/dashboard/sideBar";
import { PopoverContextProvider } from "@/context/popover";
import { QueueProvider } from "@/context/queueContext";
import { GlobalPopoverProvider } from "@/context/globalPopover";

import { ActiveCardPopoverProvider } from "@/context/activeCardPopover";
import { MusicPlayerProvider } from "@/context/musicPlayerContext";
import { DashboardNavbar } from "@/components/dashboard/dashboardNavbar";

export default function Layouts({ children }: { children: React.ReactNode }) {
  return (
    <>
      <QueueProvider>
        <GlobalPopoverProvider>
          <PopoverContextProvider>
            <MusicPlayerProvider>
              <ActiveCardPopoverProvider>
                <div className=" h-screen  flex flex-col    ">
                  <DashboardNavbar />
                  <div className=" relative flex flex-1  overflow-hidden ">
                    <MusicBar />
                    <BottomSideBar />
                    <SideBar />
                    <ShowPopover />
                    <div className=" flex-1 overflow-y-auto   ">{children}</div>
                  </div>
                </div>
              </ActiveCardPopoverProvider>
            </MusicPlayerProvider>
          </PopoverContextProvider>
        </GlobalPopoverProvider>
      </QueueProvider>
    </>
  );
}
