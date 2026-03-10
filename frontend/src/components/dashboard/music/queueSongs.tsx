import { Button } from "@/ui/button";
import { Reorder } from "motion/react";
import { QueueCards } from "./queueCard";
import { useModal } from "@/context/modalContext";
import { Dispatch, SetStateAction } from "react";
import { useQueueStore } from "@/store/queueStore";
import { useSongStore } from "@/store/songStore";

export function QueueSongs({
  setQueueOpen,
}: {
  setQueueOpen?: Dispatch<SetStateAction<boolean>>;
}) {
  const queueSong = useQueueStore((s) => s.queueSong);
  const currentSongId = useQueueStore((s) => s.queueSong[s.currentIdx]);
  const currentIdx = useQueueStore((s) => s.currentIdx);
  const updateQueueSongPosition = useQueueStore(
    (s) => s.actions.updateQueueSongPosition,
  );

  const currentSong = useSongStore((s) => s.songs[currentSongId]);
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
        {queueSong.length === 0 ? (
          <div className=" ">
            <h1 className="text-lg   ">Nothing To Plays</h1>
          </div>
        ) : (
          <div className=" pt-4 border-t-[0.5px] border-card-border">
            {currentSong && (
              <QueueCards key={currentSong.id} id={currentSong.id} />
            )}
            <div>
              <Reorder.Group
                axis="y"
                values={queueSong}
                onReorder={updateQueueSongPosition}
                className="  overflow-y-auto h-[20rem]   flex flex-col gap-4 py-2 "
              >
                {queueSong.slice(currentIdx + 1).map((song, idx) => (
                  <Reorder.Item key={idx} value={currentSongId}>
                    <QueueCards id={song} />
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
