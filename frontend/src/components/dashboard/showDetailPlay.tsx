import { removeEntity } from "@/api/removeEntity";
import { saveEntity } from "@/api/saveEntity";
import { getSong } from "@/lib/getSong";
import { IAlbum } from "@/types/albumType";
import { IArtistAlbum, IArtistInfo } from "@/types/artistType";
import { IPlaylist } from "@/types/playlistType";
import { INewReleaseSong, ISong } from "@/types/songType";
import { Button } from "@/ui/button";
import { Heart, ListPlus } from "lucide-react";
import { AddQueueIcon } from "./addQueueIcon";
import { useQueue } from "@/context/queueContext";

export function ShowDetailPlay({
  items,
  type,
  onSave,
}: {
  items:
    | ISong
    | IPlaylist
    | IAlbum
    | IArtistAlbum
    | INewReleaseSong
    | IArtistInfo;
  type: string;
  onSave: (id: string) => void;
}) {
  const { addQueueAndSetCurrent } = useQueue();
  return (
    <>
      <div className="sm:mt-4 mt-2 flex  items-center md:gap-12 gap-8 ">
        <Button
          type="button"
          btnType="Primary"
          name="Play"
          className="  h-12 w-20 max-md:h-[2.5rem] max-md:w-[4rem] "
          onClick={async () => {
            console.log(items);
            const songArr = await getSong(items);
            console.log(songArr);
            addQueueAndSetCurrent(songArr);
          }}
        />
        <div className=" hover:bg-card-hover border-[0.5px] border-card-border/30 hover:border-primary  rounded-full p-2 cursor-pointer ">
          <Heart
            size={30}
            className={`cursor-pointer    ${
              items.isLiked
                ? "fill-red-800 stroke-0 block "
                : " stroke-[1.2px] "
            } `}
            onClick={() => {
              onSave(items.type !== "artist" ? items.id : items.artistId);
            }}
          />
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
