import { useQueue } from "@/context/queueContext";
import { Button } from "@/ui/button";
import { Reorder } from "motion/react";
import { QueueCards } from "./queueCard";

export function QueueSongs() {
  const { queueSongs, toggleLike, currentSong, updateQueueSongPosition } =
    useQueue();
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
              key={currentSong.id}
              song={currentSong}
              updateState={(id: string) => {
                toggleLike(id);
              }}
            />
          )}
          <div>
            <Reorder.Group
              axis="y"
              values={queueSongs}
              onReorder={updateQueueSongPosition}
              className="  overflow-y-auto h-[20rem]   flex flex-col gap-4 py-2 "
            >
              {queueSongs.map((song) => (
                <Reorder.Item key={song.id} value={song}>
                  <QueueCards
                    song={song}
                    updateState={(id: string) => {
                      toggleLike(id);
                    }}
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
