import { Button } from "@/ui/button";
import { Reorder, useDragControls } from "motion/react";
import { QueueCards } from "./queueCard";
import { useModal } from "@/context/modalContext";
import { Dispatch, SetStateAction } from "react";
import { useQueueStore } from "@/store/queueStore";
import { useSongStore } from "@/store/songStore";
import { Grip } from "lucide-react";

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
  const controls = useDragControls();
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
                  <Reorder.Item
                    key={song}
                    value={song}
                    dragListener={false}
                    dragControls={controls}
                  >
                    <div className="hover:bg-card-hover flex gap-2 items-center justify-center rounded-lg py-1 px-2 font-body    shadow-md ">
                      {currentSong.id !== song && (
                        <Grip
                          className="  cursor-grab max-w-[30px]  max-h-[30px]   "
                          size={60}
                          onPointerDown={(e) => {
                            controls.start(e);
                          }}
                        />
                      )}
                      <QueueCards id={song} />
                    </div>
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
