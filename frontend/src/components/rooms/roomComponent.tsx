import { Button } from "@/ui/button";
import { ChevronDown, ChevronsUpDown, ChevronUp, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useModal } from "@/context/modalContext";
import { RoomListType } from "@/types/roomTypes";
import { getRooms } from "@/api/room/getRooms";

export function RoomComponent() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { showModal } = useModal();
  const [rooms, setRooms] = useState<RoomListType[]>([
    {
      roomId: "uqP8_-YO",
      roomName: "Rahul",
    },
    {
      roomId: "uqP8_-YO",
      roomName: "Rahul",
    },
    {
      roomId: "uqP8_-YO",
      roomName: "Rahul",
    },
  ]);
  // useEffect(() => {
  //   const fetchRoom = async () => {
  //     const rooms = await getRooms();
  //     setRooms(rooms);
  //   };
  //   fetchRoom();
  // }, []);

  return (
    <>
      <div className=" w-[12rem] max-lg:hidden">
        <Button
          btnType="Secondary"
          className="w-full justify-between  "
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        >
          Rooms
          <ChevronsUpDown size={16} />
        </Button>
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
                    <div>
                      <h1 className=" text-lg max-w-18  line-clamp-1 truncate ">
                        {room.roomName}
                      </h1>
                      <p className="  text-[10px] line-clamp-1 ">
                        {room.roomId}
                      </p>
                    </div>
                    <div className=" flex gap-2 items-center justify-center ">
                      <Button btnType="Primary" className=" w-10 h-6 text-xs  ">
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
