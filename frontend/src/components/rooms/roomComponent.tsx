import { Button } from "@/ui/button";
import { ChevronDown, ChevronsUpDown, ChevronUp, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useModal } from "@/context/modalContext";
import { useWebSocketStore } from "@/store/webSocketStore";
import { useAuth } from "@/context/authContext";
import { useRoomStore } from "@/store/roomStore";

export function RoomComponent() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { showModal } = useModal();
  const rooms = useRoomStore((s) => s.room);
  const connect = useWebSocketStore((s) => s.actions.connect);
  const currentRoomId = useWebSocketStore((s) => s.currentRoomId);
  const { currentUser } = useAuth();
  return (
    <>
      <div className=" w-[12.8rem] max-lg:hidden">
        <div className=" relative ">
          {currentRoomId && (
            <div className=" absolute -top-1 bg-green-700 rounded-full size-4 z-40 ">
              <div className="  bg-green-700 rounded-full size-4 animate-ping "></div>
            </div>
          )}
          <Button
            btnType="Secondary"
            className="w-full justify-between  "
            onClick={() => {
              setIsOpen((prev) => !prev);
            }}
          >
            {!currentRoomId ? "Rooms" : currentRoomId}

            <ChevronsUpDown size={16} />
          </Button>
        </div>
        <div className="relative w-full">
          {isOpen && (
            <AnimatePresence>
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-px pb-2 bg-card z-50 shadow-2xl max-h-[14rem] w-full overflow-y-scroll  "
              >
                {rooms.map((room, idx) => (
                  <li
                    key={idx}
                    className=" flex gap-2 justify-between hover:bg-card-hover p-2 w-full overflow-hidden "
                  >
                    <div className=" flex gap-2 ">
                      {/* <div className=" size-10 rounded-full bg-neutral-300  "></div> */}
                      <div>
                        <h1 className=" text-lg max-w-18  line-clamp-1 truncate ">
                          {room.roomName}
                        </h1>
                        <p className="  text-[10px] line-clamp-1 ">
                          {room.roomId}
                        </p>
                      </div>
                    </div>
                    <div className=" flex gap-2 items-center justify-center ">
                      <Button
                        btnType="Primary"
                        className=" w-10 h-6 text-xs  "
                        onClick={() => {
                          connect({
                            roomId: room.roomId,
                            roomName: room.roomName,
                            userId: currentUser?.userId || "",
                          });
                        }}
                      >
                        Join
                      </Button>
                      <Button
                        btnType="Secondary"
                        className=" w-10 h-6 text-xs "
                        onClick={() => {
                          setIsOpen((prev) => !prev);
                          showModal("roomInfo");
                        }}
                      >
                        More
                      </Button>
                    </div>
                  </li>
                ))}
                <div className=" mt-2  w-full px-2 ">
                  <Button
                    btnType="Primary"
                    className=" text-sm w-full "
                    onClick={() => {
                      setIsOpen((prev) => !prev);
                      showModal("createNewRoom");
                    }}
                  >
                    <Plus className="stroke-[1px] " />
                    Create new room
                  </Button>
                </div>
              </motion.ul>
            </AnimatePresence>
          )}
        </div>
      </div>
    </>
  );
}
