import { savePlaylist } from "@/lib/savePlaylist";
import axios from "axios";

export function PlaylistPopover() {
  return (
    <>
      <div className="  w-[12rem]   py-2 bg-card rounded-lg flex flex-col  ">
        <button
          className=" hover:bg-bar text-lg hover:bg-card-hover py-1 cursor-pointer "
          onClick={async () => {
            // const response = savePlaylist()
          }}
        >
          Save To Library
        </button>
        <button className=" hover:bg-bar text-lg hover:bg-card-hover py-1 cursor-pointer ">
          Play From Playlist
        </button>
        <button className=" hover:bg-bar text-lg hover:bg-card-hover py-1 cursor-pointer ">
          Add To Queue
        </button>
        <button className=" hover:bg-bar text-lg hover:bg-card-hover py-1 cursor-pointer ">
          Add To Playlist
        </button>
      </div>
    </>
  );
}
