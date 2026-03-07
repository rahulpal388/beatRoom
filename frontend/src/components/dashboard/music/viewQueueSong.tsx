import { useQueueStore } from "@/store/queueStore";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { QueueSongs } from "./queueSongs";
import { ListMusic } from "lucide-react";

export function ViewQueueSongs() {
  const [queueOpen, setQueueOpen] = useState<boolean>(false);
  const isCurrentSong = useQueueStore((s) => s.isCurrentSong);

  return (
    <>
      <div>
        <AnimatePresence>
          {queueOpen && (
            <motion.div
              initial={{
                height: 0,
              }}
              animate={{
                height: "24rem",
              }}
              exit={{
                height: 0,
              }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}
              className=" px-2 h-[24rem] w-[24rem] bg-card shadow-2xl  fixed   bottom-30 lg:bottom-20  right-4 lg:right-[4rem] max-md:hidden overflow-hidden rounded-xl
                 "
            >
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0,
                  ease: "easeInOut",
                }}
              >
                <QueueSongs setQueueOpen={setQueueOpen} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <ListMusic
          size={30}
          className={`stroke-1 max-md:hidden ${isCurrentSong ? "cursor-pointer" : "cursor-not-allowed opacity-40"}`}
          onClick={() => {
            if (isCurrentSong) {
              setQueueOpen(!queueOpen);
            }
          }}
        />
      </div>
    </>
  );
}
