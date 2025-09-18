import { RoomCard } from "./roomCard";




export function Rooms() {

    return <>
        <div className="  w-full h-full px-6 overflow-y-auto  ">
            <div className="  mt-4 flex items-center justify-end ">
                <button className=" px-4 py-2 dark:bg-accent-foreground/50 dark:hover:bg-accent-foreground cursor-pointer rounded " >Create Room</button>
            </div>
            <div className="   mt-6 grid grid-cols-3 gap-12  overflow-y-scroll pb-12 px-2  ">
                <RoomCard />
                <RoomCard />
                <RoomCard />
                <RoomCard />
                <RoomCard />
            </div>
        </div>
    </>
}