import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { motion } from "motion/react"


export function CreateRoomCard({ setCreateRoom }: {
    setCreateRoom: Dispatch<SetStateAction<boolean>>;
}) {

    return <>
        <div className="absolute top-0 left-0 bg-transparent backdrop-blur-[0.5px]  h-screen w-screen  flex items-center justify-center "
            onClick={(e) => {
                setCreateRoom(false);
            }}
        >
            <motion.div
                initial={{
                    scale: 0,
                    opacity: 0,
                }}
                animate={{
                    scale: 1,
                    opacity: 1
                }}
                transition={{
                    duration: 0.3,
                    ease: "easeInOut"
                }}
                exit={{
                    scale: 0,
                    opacity: 0
                }}

                className=" bg-card-foreground shadow-2xl shadow-black rounded-lg h-96 w-96 py-4 px-6 "
                onClick={(e) => { e.stopPropagation() }}
            >
                <div className="flex items-center justify-end">
                    <X className=" cursor-pointer size-8 stroke-[1px] "
                        onClick={() => {
                            setCreateRoom(false);
                        }}
                    />
                </div>
                <div className="mt-4">
                    <h1 className="text-center text-2xl font-bold ">Create Your BeatRoom</h1>
                    <p className="text-center text-sm text-neutral-400 font-medium  ">Start your own space, invite friends, and stream music, videos, and vibes together</p>
                </div>
                <div>
                    <form action="">
                        <div className="flex gap-1 flex-col mt-4 ">
                            <label htmlFor="username" className="text-lg">Username</label>
                            <Input inputType="Primary" type="text" id="username" placeholder="Enter username" />
                        </div>
                        <div className="flex gap-1 flex-col mt-4 ">
                            <label htmlFor="roomName" className="text-lg">Room Name</label>
                            <Input inputType="Primary" type="text" id="roomName" placeholder="Enter room name" />
                        </div>
                        <div className="flex justify-center">
                            <Button type="Primary" name="Create Room" className="mt-8  " />
                        </div>
                    </form>
                </div>
            </motion.div>

        </div>
    </>

}

