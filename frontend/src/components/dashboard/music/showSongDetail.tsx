import { useCurrentSongDetail } from "@/context/currentSong";
import { useQueue } from "@/context/queueContext";
import { decodeHTML } from "@/lib/decodeHtml";
import { formateTime } from "@/lib/formateTime";
import { getSong } from "@/lib/getSong";
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
  album_url,
  song_url,
}: {
  image: string;
  title: string;
  subtitle: string;
  language: string;
  type: string;
  duration: string;
  album_url: string;
  song_url: string;
}) {
  const { setCurrentSong, setIsPlaying } = useCurrentSongDetail();
  const { setQueueSongs } = useQueue();
  const song_token = song_url.split("/").at(-1);
  const album_token = album_url.split("/").at(-1);

  return (
    <div className="mt-8 lg:px-20 flex md:gap-8 gap-2 justify-center max-md:flex-col  items-center ">
      <Image
        src={image}
        alt="song image"
        height={300}
        width={300}
        className=" h-[15rem] w-[18rem] rounded-xl shadow-2xl  "
      />
      <div className="lg:w-[40rem]  max-md:flex flex-col items-center justify-center  ">
        <h1 className=" text-3xl font-semibold font-heading text-text-heading line-clamp-2  items-center  ">
          {decodeHTML(title)}
        </h1>
        <div className="md:mt-4 mt-px text-text-body text-sm flex flex-col max-md:gap-1 ">
          <p className=" line-clamp-2  ">{decodeHTML(subtitle)}</p>
          <p>
            {language} - {type}
          </p>
          <p>{formateTime(duration)}</p>
        </div>
        <div className="mt-2 flex items-center gap-12 ">
          <Button
            type="button"
            btnType="Primary"
            name="Play"
            className="  h-12 w-20 "
            onClick={() => {
              getSong({
                song_token,
                album_token,
                type,
                setCurrentSong,
                setIsPlaying,
                setQueueSongs,
              });
            }}
          />
          <div className=" hover:bg-card-hover border-[0.5px] border-card-border rounded-full p-2 cursor-pointer ">
            <Heart size={36} />
          </div>
          <div className=" hover:bg-card-hover border-[0.5px] border-card-border rounded-full p-2 cursor-pointer ">
            <EllipsisVertical size={36} />
          </div>
        </div>
      </div>
    </div>
  );
}
