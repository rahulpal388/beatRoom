import { useQueue } from "@/context/queueContext";
import { ToggleLeft, ToggleRight } from "lucide-react";
import { QueueCards } from "./queueCard";

export function SongQueue() {
  const { isQueueOn, setIsQueueOn, queueSongs, setQueueSongs } = useQueue();
  return (
    <>
      <div className="h-full">
        <div className=" flex items-center justify-between  ">
          <h1 className=" text-lg fond-bold font-heading ">Song Queue</h1>
          {isQueueOn ? (
            <ToggleRight
              className=" size-8 cursor-pointer stroke-green-700 "
              onClick={() => setIsQueueOn(false)}
            />
          ) : (
            <ToggleLeft
              className=" size-8 cursor-pointer stroke-red-700  "
              onClick={() => setIsQueueOn(true)}
            />
          )}
        </div>
        {queueSongs.length === 0 ? (
          <div className=" mt-20 text-center dark:text-neutral-600 ">
            {isQueueOn ? "No Queue Songs" : "Queue is OFF"}
          </div>
        ) : (
          <div className=" mt-4 flex flex-col gap-2 h-full  overflow-y-auto ">
            {queueSongs.map((item, index) => (
              <QueueCards
                key={index}
                name={item.title}
                artist={item.artist}
                image={item.image}
                setQueueSongs={setQueueSongs}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
