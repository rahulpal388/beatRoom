import { getSong } from "@/lib/getSong";
import { IAlbum } from "@/types/albumType";
import { IArtistAlbum, IArtistInfo } from "@/types/artistType";
import { IPlaylist } from "@/types/playlistType";
import { INewReleaseSong, ISong } from "@/types/songType";
import { Button } from "@/ui/button";
import { Heart, ListPlus } from "lucide-react";




export function ShowDetailPlay({ items, type }: { items: ISong | IPlaylist | IAlbum | IArtistAlbum | INewReleaseSong | IArtistInfo, type: string }) {

    return <>
        <div className="sm:mt-4 mt-2 flex items-center md:gap-12 gap-8 ">
            <Button
                type="button"
                btnType="Primary"
                name="Play"
                className="  h-12 w-20 max-md:h-[2.5rem] max-md:w-[4rem] "
                onClick={() => {
                    getSong(items);
                }}
            />
            <div className=" hover:bg-card-hover border-[0.5px] border-card-border/30 hover:border-primary  rounded-full p-2 cursor-pointer ">
                <Heart size={32} className=" max-md:size-[1.5rem] stroke-[1.5px] " />
            </div>
            {type !== "artist" &&
                <div className=" hover:bg-card-hover border-[0.5px] border-card-border/30 hover:border-primary rounded-full p-2 cursor-pointer ">
                    <ListPlus size={32} className=" max-md:size-[1.5rem] stroke-[1.5px] " />
                </div>
            }
        </div>
    </>
}