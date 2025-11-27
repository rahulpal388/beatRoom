import { decodeHTML } from "@/lib/decodeHtml";
import { formateTime } from "@/lib/formateTime";
import { ISong } from "@/types/songType";
import { Button } from "@/ui/button";
import { EllipsisVertical, Heart } from "lucide-react";
import Image from "next/image";

export function ShowSongDetails({
  image,
  title,
  subtitle,
  language,
  type,
  duration,
}: {
  image: string;
  title: string;
  subtitle: string;
  language: string;
  type: string;
  duration: string;
}) {
  return (
    <div className="mt-8 px-20 flex   gap-8  ">
      <div className="  ">
        <Image
          src={image}
          alt="song image"
          height={100}
          width={100}
          className=" h-[15rem] w-[18rem] rounded-xl shadow-2xl  "
        />
      </div>
      <div className="w-[40rem]   ">
        <h1 className=" text-3xl font-bold  ">{decodeHTML(title)}</h1>
        <div className="mt-4">
          <p className=" line-clamp-2 text-sm ">{subtitle}</p>
          <p>
            {language} - {type}
          </p>
          <p>{formateTime(duration)}</p>
        </div>
        <div className="mt-12 flex items-center gap-12 ">
          <Button
            type="button"
            btnType="Primary"
            name="Play"
            className=" h-12 w-20 "
          />
          <div className=" hover:bg-neutral-800 border border-neutral-600 rounded-full p-2 cursor-pointer ">
            <Heart size={36} />
          </div>
          <div className="hover:bg-neutral-800  border border-neutral-600 rounded-full p-2 cursor-pointer ">
            <EllipsisVertical size={36} />
          </div>
        </div>
      </div>
    </div>
  );
}
