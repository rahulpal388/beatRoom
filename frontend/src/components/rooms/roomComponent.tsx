import { Button } from "@/ui/button";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useModal } from "@/context/modalContext";

type RoomListType = {
  roomid: string;
  name: string;
  members: string[];
};

const roomList: RoomListType[] = [
  {
    roomid: "2NIhwe8",
    name: "room 1dds skdsj",
    members: ["Rahul", "Ritesh", "Niraj", "Sundram", "Bharti"],
  },
  {
    roomid: "2NI1we8",
    name: "room 1",
    members: ["Rahul", "Ritesh", "Niraj", "Sundram", "Bharti"],
  },
  {
    roomid: "2NIhwe8",
    name: "room 1",
    members: ["Rahul", "Ritesh", "Niraj", "Sundram", "Bharti"],
  },
  {
    roomid: "2NIhwe8",
    name: "room 1",
    members: ["Rahul", "Ritesh", "Niraj", "Sundram", "Bharti"],
  },
  {
    roomid: "2NIhwe8",
    name: "room 1",
    members: ["Rahul", "Ritesh", "Niraj", "Sundram", "Bharti"],
  },
  {
    roomid: "2NIhwe8",
    name: "room 1",
    members: ["Rahul", "Ritesh", "Niraj", "Sundram", "Bharti"],
  },
  {
    roomid: "2NIhwe8",
    name: "room 1",
    members: ["Rahul", "Ritesh", "Niraj", "Sundram", "Bharti"],
  },
];

export function RoomComponent() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { showModal } = useModal();
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
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </Button>
        <div className="relative w-full">
          {isOpen && (
            <AnimatePresence>
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-px pb-2 bg-card z-50 shadow-2xl h-[14rem] w-full overflow-y-scroll  "
              >
                {roomList.map((room, idx) => (
                  <li
                    key={idx}
                    className=" flex gap-2 justify-between hover:bg-card-hover p-2 w-full "
                  >
                    <div>
                      <h1 className=" text-lg line-clamp-1 ">{room.name}</h1>
                      <p className="  text-[10px] line-clamp-1 ">
                        {room.roomid}
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
