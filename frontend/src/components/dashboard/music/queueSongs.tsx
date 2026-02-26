import { useQueue } from "@/context/queueContext";
import { Button } from "@/ui/button";
import { Reorder } from "motion/react";
import { QueueCards } from "./queueCard";
import { useModal } from "@/context/modalContext";
import { Dispatch, SetStateAction } from "react";

export function QueueSongs({
  setQueueOpen,
}: {
  setQueueOpen?: Dispatch<SetStateAction<boolean>>;
}) {
  const {
    queueSongs,
    toggleLike,
    currentSong,
    updateQueueSongPosition,
    currentIdx,
  } = useQueue();
  const { showModal } = useModal();
  return (
    <>
      <div className="  ">
        <div className="  flex items-center justify-between p-4  ">
          <div>
            <h1 className=" text-2xl   ">Queue</h1>
          </div>
          <div className=" flex items-center gap-4   ">
            <Button
              type="button"
              name="Save"
              btnType="Primary"
              onClick={() => {
                if (setQueueOpen) {
                  setQueueOpen(false);
                }
                showModal("saveQueue");
              }}
            />
          </div>
        </div>
        {queueSongs.length === 0 ? (
          <div className=" ">
            <h1 className="text-lg   ">Nothing To Plays</h1>
          </div>
        ) : (
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
                {queueSongs.slice(currentIdx + 1).map((song) => (
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
        )}
      </div>
    </>
  );
}
