import { decodeHTML } from "@/lib/decodeHtml";
import { formateTime } from "@/lib/formateTime";
import { getItemsToken } from "@/lib/getItemsToken";
import { getSong } from "@/lib/getSong";
import { IAlbumSong } from "@/types/albumType";
import { IPlaylistSong } from "@/types/playlistType";
import { ISong } from "@/types/songType";
import { Button } from "@/ui/button";
import { EllipsisVertical, Heart, ListPlus } from "lucide-react";
import Image from "next/image";
import { it } from "node:test";
import { ShowDetailPlay } from "../showDetailPlay";

export function ShowSongDetails({ items
}: {
  items: ISong | IPlaylistSong | IAlbumSong
}) {
  const { token, AlbumToken } = getItemsToken(items.perma_url, items.type === "song" ? items.more_info.album_url : "");

  return (
    <div className="mt-8 lg:px-20 flex md:gap-8 gap-2 justify-center max-md:flex-col  items-center ">
      <Image
        src={items.image}
        alt="song image"
        height={300}
        width={300}
        className=" h-[15rem] w-[18rem] rounded-xl shadow-2xl max-sm:h-[12rem] max-sm:w-[14rem]  "
      />
      <div className="lg:w-[40rem]  max-md:flex flex-col items-center justify-center  ">
        <h1 className=" text-3xl max-md:text-center font-semibold font-heading text-text-heading line-clamp-2  items-center  ">
          {decodeHTML(items.title)}
        </h1>
        <div className="md:mt-4 max-md:text-center mt-px text-text-body   text-[16px] flex flex-col  ">
          <p className=" line-clamp-2  ">{decodeHTML(items.subtitle)}</p>

          <p >
            {items.language[0].toUpperCase() + items.language.slice(1)} &#8226; {items.type[0].toUpperCase() + items.type.slice(1)}
            {items.type === "song" && (
              <>
                {" "}
                &#8226; {Number(items.play_count).toLocaleString()} Plays
                {" "}
                &#8226; {formateTime(items.more_info.duration)}
              </>
            )}
          </p>

        </div>
        <ShowDetailPlay items={items} type={items.type} />
      </div>
    </div>
  );
}
