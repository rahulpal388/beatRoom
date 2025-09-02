'use client'
import { Dispatch, SetStateAction } from "react";
import { motion } from "motion/react"
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { SubmitHandler, useForm } from "react-hook-form";


type IRoom = {
    link: string
}

export function JoinRoomCard({ setJoinRoom }: {
    setJoinRoom: Dispatch<SetStateAction<boolean>>
}) {
    const { handleSubmit, register } = useForm<IRoom>();

    const onSubmit: SubmitHandler<IRoom> = (data) => {
        console.log("joooo")
        console.log(`Room link => ${data.link}`)
    }

    return <>
        <div className="absolute top-0 left-0 bg-transparent backdrop-blur-[0.5px]  h-screen w-screen  flex items-center justify-center px-10 "
            onClick={(e) => {
                setJoinRoom(false);
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

                className=" z-50 bg-card-foreground shadow-2xl shadow-black rounded-lg  w-96 py-4 px-6 "
                onClick={(e) => { e.stopPropagation() }}
            >
                <div className="flex items-center justify-end">
                    <X className=" cursor-pointer size-8 stroke-[1px] "
                        onClick={() => {
                            setJoinRoom(false);
                        }}
                    />
                </div>
                <div className="mt-4">
                    <h1 className="text-center text-2xl font-bold ">Create Your BeatRoom</h1>
                    <p className="text-center text-sm text-neutral-400 font-medium  ">Start your own space, invite friends, and stream music, videos, and vibes together</p>
                </div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex gap-1 flex-col mt-4 ">
                            <label htmlFor="roomLink" className="text-lg">Room Link</label>
                            <input className="bg-black px-2 py-1 rounded border-[0.5px] border-white" id="roomLink" placeholder="Enter room link" type="text"  {...register("link", { required: true })} />
                        </div>
                        <div className="flex justify-center">
                            <Button type="submit" btnType="Primary" name="Join Room" className="mt-8  " />
                        </div>
                    </form>
                </div>
            </motion.div>

        </div>
    </>

}
