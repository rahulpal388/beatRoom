import { useState } from "react";
import { RoomMembers } from "./roomMembers";
import { RoomQueueSongs } from "./roomQueueSong";
import { RoomChats } from "./roomChats";

type RoomItems = "members" | "queueSong" | "chats";

type RoomItemsType = {
  title: string;
  active: RoomItems;
};

const roomItems: RoomItemsType[] = [
  {
    title: "Members",
    active: "members",
  },
  {
    title: "QueueSongs",
    active: "queueSong",
  },
  {
    title: "Chats",
    active: "chats",
  },
];

export function RoomInfo() {
  const [activeItem, setActiveItem] = useState<RoomItems>("members");
  return (
    <>
      <div className=" w-[42rem] h-[22rem]   ">
        <div className="  h-6 flex gap-8 items-center border-b-[1px] border-primary/20  ">
          {roomItems.map((items, idx) => (
            <h1
              key={idx}
              className={`cursor-pointer ${activeItem === items.active ? "border-b-[1.5px] " : "hover:border-b-[1.5px] "} border-primary`}
              onClick={() => {
                setActiveItem(items.active);
              }}
            >
              {items.title}
            </h1>
          ))}
        </div>
        <div className=" mt-4 ">
          {activeItem === "members" && <RoomMembers />}
          {activeItem === "queueSong" && <RoomQueueSongs />}
          {activeItem === "chats" && <RoomChats />}
        </div>
      </div>
    </>
  );
}
