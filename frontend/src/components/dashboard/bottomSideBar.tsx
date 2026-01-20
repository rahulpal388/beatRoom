import { Compass, House, Music4, Search } from "lucide-react";
import Link from "next/link";

export function BottomSideBar() {
  return (
    <>
      <div className="bg-card z-50 lg:hidden w-full h-12 fixed bottom-0 bg-bar flex border-t-[0.5px] border-card-border ">
        <div className="w-full flex items-center justify-between sm:px-20 px-8  ">
          <div className=" flex flex-col items-center cursor-pointer ">
            <Link href={"/dashboard"} >
              <House className=" stroke-1 " />
              <p className=" text-xs text-neutral-400 ">Home</p>
            </Link>
          </div>
          <div className=" flex flex-col items-center  cursor-pointer">
            <Link href={"/dashboard/search"}>
              <Search className=" stroke-1 " />
              <p className=" text-xs text-neutral-400 ">Search</p>
            </Link>
          </div>
          <div className=" flex flex-col items-center cursor-pointer ">
            <Compass className=" stroke-1 " />
            <p className=" text-xs text-neutral-400 ">Browse</p>
          </div>
          <div className=" flex flex-col items-center cursor-pointer ">
            <Music4 className=" stroke-1 " />
            <p className=" text-xs text-neutral-400 ">My Library</p>
          </div>
        </div>
      </div>
    </>
  );
}
