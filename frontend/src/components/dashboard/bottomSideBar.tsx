import { Compass, House, Music4, Search } from "lucide-react";

export function BottomSideBar() {
  return (
    <>
      <div className=" z-50 lg:hidden w-full h-12 fixed bottom-0 bg-bar flex border-t-[0.5px]   border-neutral-700 ">
        <div className="w-full flex items-center justify-between sm:px-20 px-8  ">
          <div className=" flex flex-col items-center cursor-pointer ">
            <House className=" stroke-1 " />
            <p className=" text-xs text-neutral-400 ">Home</p>
          </div>
          <div className=" flex flex-col items-center  cursor-pointer">
            <Search className=" stroke-1 " />
            <p className=" text-xs text-neutral-400 ">Search</p>
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
