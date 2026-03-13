import { getSong } from "@/lib/getSong";
import { IAlbum } from "@/types/albumType";
import { IArtistAlbum, IArtistInfo } from "@/types/artistType";
import { IPlaylist } from "@/types/playlistType";
import { INewReleaseSong, ISong } from "@/types/songType";
import { Button } from "@/ui/button";
import { Heart } from "lucide-react";
import { AddQueueIcon } from "./addQueueIcon";
import { useQueueStore } from "@/store/queueStore";
import { SaveItemHeart } from "./saveItemHeart";
import { useState } from "react";

export function ShowDetailPlay({
  items,
  type,
}: {
  items: ISong | IPlaylist | IAlbum | IArtistAlbum;

  type: string;
}) {
  const { addQueueSongAndSetCurrent } = useQueueStore((s) => s.actions);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <div className="sm:mt-4 mt-2 flex  items-center md:gap-12 gap-8 ">
        <Button
          type="button"
          btnType="Primary"
          disabled={loading}
          className="  h-12 w-20 max-md:h-[2.5rem] max-md:w-[4rem] "
          onClick={async () => {
            setLoading(true);
            const songArr = await getSong(items);
            addQueueSongAndSetCurrent(songArr);
            setLoading(false);
          }}
        >
          {loading ? (
            <div className="animate-spin h-10 w-10 border-2 border-white border-t-transparent rounded-full"></div>
          ) : (
            <p>Play</p>
          )}
        </Button>
        <div className=" hover:bg-card-hover border-[0.5px] border-card-border/30 hover:border-primary  rounded-full p-2 cursor-pointer ">
          <SaveItemHeart songs={items} showHeart={true} />
        </div>
        {type !== "artist" && (
          <div className=" hover:bg-card-hover border-[0.5px] border-card-border/30 hover:border-primary rounded-full p-2 cursor-pointer ">
            <AddQueueIcon songs={items} />
          </div>
        )}
      </div>
    </>
  );
}
