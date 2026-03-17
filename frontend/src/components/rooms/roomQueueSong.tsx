import { QueueCards } from "../dashboard/music/queueCard";
import { tempQueueSongs } from "./temprorySongs";

export function RoomQueueSongs() {
  const songs = [];
  return (
    <>
      <div>
        {songs.length === 0 ? (
          <div className=" flex items-center justify-center ">
            No Queue Songs
          </div>
        ) : (
          <h1 className=" text-lg ">Total {10} Queue Songs</h1>
        )}
      </div>
    </>
  );
}
