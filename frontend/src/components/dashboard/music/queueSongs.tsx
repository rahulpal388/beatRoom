import { useCurrentSongDetail } from "@/context/currentSong";
import { useQueue } from "@/context/queueContext";
import { Button } from "@/ui/button";
import { Reorder } from "motion/react";
import { QueueCards } from "./queueCard";

export function QueueSongs() {
  const { currentSong } = useCurrentSongDetail();
  const { queueSongs, setQueueSongs } = useQueue();
  return (
    <>
      <div className="  ">
        <div className="  flex items-center justify-between p-4  ">
          <div>
            <h1 className=" text-2xl   ">Queue</h1>
          </div>
          <div className=" flex items-center gap-4   ">
            <Button type="button" name="Save" btnType="Primary" />
            <Button type="button" name="Cancel" btnType="Secondary" />
          </div>
        </div>

        <div className=" pt-4 border-t-[0.5px] border-card-border">
          {currentSong && (
            <QueueCards
              name={currentSong.title}
              key={currentSong.id}
              artist={currentSong.more_info.artistMap.artists
                .map((x) => x.name)
                .join(", ")}
              image={currentSong.image}
            />
          )}
          <div>
            <Reorder.Group
              axis="y"
              values={queueSongs}
              onReorder={setQueueSongs}
              className="  overflow-y-auto h-[20rem]   flex flex-col gap-4 py-2 "
            >
              {queueSongs
                .filter((x) => x.id != currentSong.id)
                .map((song) => (
                  <Reorder.Item key={song.id} value={song}>
                    <QueueCards
                      name={song.title}
                      artist={song.more_info.artistMap.artists
                        .map((x) => x.name)
                        .join(", ")}
                      image={song.image}
                    />
                  </Reorder.Item>
                ))}
            </Reorder.Group>
          </div>
        </div>
      </div>
    </>
  );
}
