import { Ellipsis, Grip, Heart, Play, Trash2 } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
// import { TSong } from "./music";

export function QueueCards({
  name,
  artist,
  image,
}: {
  name: string;
  artist: string;
  image: string;
}) {
  return (
    <>
      <div className="  flex items-center justify-between  hover:bg-bar rounded-lg py-1 px-2 font-body    shadow-md ">
        <div>
          <Grip className=" cursor-grab " />
        </div>
        <div className="flex items-center gap-2">
          <Image src={image} alt="image" height={40} width={40} />
          <div>
            <h1 className="text-md  w-32 line-clamp-1 cursor-pointer ">
              {name}
            </h1>
            <p className=" text-xs  text-neutral-600 w-32 line-clamp-1 ">
              {artist}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4  ">
          <Heart className=" cursor-pointer " />
          <p>4:30</p>
          <Ellipsis className=" cursor-pointer " />
        </div>
      </div>
    </>
  );
}
