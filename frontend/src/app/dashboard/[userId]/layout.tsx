"use client";
import { BottomSideBar } from "@/components/dashboard/bottomSideBar";
import { MusicBar } from "@/components/dashboard/music/MusicBar";
import { MusicPlayer } from "@/components/dashboard/music/musicPlayer";
import { SearchBar } from "@/components/dashboard/music/SearchBar";
import { ShowPopover } from "@/components/dashboard/options/showOptions";
import { SideBar } from "@/components/dashboard/sideBar";
import { PopoverContextProvider } from "@/context/popover";
import { useAuth } from "@/context/authContext";
import { CurrentSongConttextProvider } from "@/context/currentSong";
import { QueueProvider } from "@/context/queueContext";
import { SideBarContextProvider } from "@/context/sidebarContext";
import { Copy } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Layouts({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, currentUser } = useAuth();
  const { userId } = useParams();
  return (
    <>
      <CurrentSongConttextProvider>
        <SideBarContextProvider>
          <QueueProvider>
            <PopoverContextProvider>
              <MusicPlayer />
              <div className=" h-screen  flex flex-col    ">
                <div className="  h-12 border-b-[0.5px] border-muted/20  dark:shadow-2xl  flex justify-between items-center gap-4 px-8  ">
                  <div>
                    <Link
                      href={`/dashboard/${userId}`}
                      className=" text-xl  font-extralight italic cursor-pointer "
                    >
                      beatRoom
                    </Link>
                  </div>
                  <div className=" relative flex items-center gap-4 justify-end max-lg:hidden  ">
                    <SearchBar />
                  </div>
                  <div className=" flex gap-12  ">
                    <button className="max-md:hidden cursor-pointer dark:shadow-xl dark:bg-card px-2 py-1 rounded text-muted flex gap-2 items-center ">
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
                <div className=" relative flex flex-1  overflow-hidden ">
                  <MusicBar />
                  <BottomSideBar />
                  <SideBar />
                  <ShowPopover />
                  <div className=" flex-1 overflow-y-auto   ">{children}</div>
                </div>
              </div>
            </PopoverContextProvider>
          </QueueProvider>
        </SideBarContextProvider>
      </CurrentSongConttextProvider>
    </>
  );
}
