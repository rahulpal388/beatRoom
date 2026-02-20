"use client";
import { BottomSideBar } from "@/components/dashboard/bottomSideBar";
import { MusicBar } from "@/components/dashboard/music/MusicBar";
import { SearchBar } from "@/components/dashboard/music/SearchBar";
import { ShowPopover } from "@/components/dashboard/options/showOptions";
import { SideBar } from "@/components/dashboard/sideBar";
import { PopoverContextProvider } from "@/context/popover";
import { useAuth } from "@/context/authContext";
import { QueueProvider } from "@/context/queueContext";
import { Copy } from "lucide-react";
import Link from "next/link";
import { GlobalPopoverProvider } from "@/context/globalPopover";
import { Button } from "@/ui/button";
import { useRouter } from "next/navigation";
import { ActiveCardPopoverProvider } from "@/context/activeCardPopover";
import { MusicPlayerProvider } from "@/context/musicPlayerContext";

export default function Layouts({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, currentUser } = useAuth();
  const router = useRouter();
  return (
    <>
      <QueueProvider>
        <GlobalPopoverProvider>
          <PopoverContextProvider>
            <MusicPlayerProvider>
              <ActiveCardPopoverProvider>
                <div className=" h-screen  flex flex-col    ">
                  <div className=" bg-card h-14 border-b-[0.5px] border-text-muted/20  shadow-soft  flex justify-between items-center gap-4 px-8  ">
                    <div>
                      <Link
                        href={`/dashboard`}
                        className=" text-xl  font-extralight italic cursor-pointer "
                      >
                        beatRoom
                      </Link>
                    </div>
                    <div className=" relative flex items-center gap-4 justify-end max-lg:hidden  ">
                      <SearchBar />
                    </div>
                    <div className=" flex gap-12  ">
                      <button className="max-md:hidden cursor-pointer shadow-soft  px-2 py-1 rounded text-text-body hover:bg-card-hover flex gap-2 items-center border-[0.5px] border-card-border hover:border-primary ">
                        Invite friends
                        <Copy size={14} />
                      </button>
                      {isAuthenticated ? (
                        <div className="flex gap-4">
                          <div className=" flex flex-col items-center justify-end ">
                            <h1 className=" text-sm ">
                              {currentUser?.username}
                            </h1>
                            <p className=" text-[10px] ">
                              {currentUser?.userId}
                            </p>
                          </div>
                          <div className="font-bold bg-green-700 size-9 rounded-full shadow-2xl flex items-center justify-center ">
                            {currentUser?.username[0].toLocaleUpperCase()}
                          </div>
                        </div>
                      ) : (
                        <Button
                          name="Login"
                          btnType="Primary"
                          type="button"
                          onClick={() => {
                            router.push("/login");
                          }}
                        />
                      )}
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
              </ActiveCardPopoverProvider>
            </MusicPlayerProvider>
          </PopoverContextProvider>
        </GlobalPopoverProvider>
      </QueueProvider>
    </>
  );
}
