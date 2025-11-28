import {
  Ellipsis,
  Grip,
  GripVertical,
  Heart,
  Play,
  Trash2,
} from "lucide-react";
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
      <div className="  flex items-center  justify-between gap-4  hover:bg-card-hover rounded-lg py-1 px-2 font-body    shadow-md ">
        <div className="flex items-center gap-2   ">
          <GripVertical className=" cursor-grab    " size={20} />
          <Image
            src={image}
            alt="image"
            height={40}
            width={40}
            className=" rounded"
          />
          <div>
            <h1 className="text-md text-text-heading font-heading  max-[16rem]  line-clamp-1 cursor-pointer ">
              {name}
            </h1>
            <p className=" text-[0.7rem]  text-text-muted max-w-[16rem] line-clamp-1 ">
              {artist}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-8  ">
          <Heart className=" cursor-pointer max-md:hidden" />
          <p className=" max-sm:hidden ">4:30</p>
          <Ellipsis className=" cursor-pointer " />
        </div>
      </div>
    </>
  );
}
