'use client'
import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { motion } from "motion/react"
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { BASE_URL } from "@/lib/baseUrl";
import { useRouter } from "next/navigation";

type ICreateRoom = {
    userName: string,
    roomName: string
}

export function CreateRoomCard({ setCreateRoom }: {
    setCreateRoom: Dispatch<SetStateAction<boolean>>;
}) {

    const { handleSubmit, register } = useForm<ICreateRoom>()
    const router = useRouter();


    const onSubmit: SubmitHandler<ICreateRoom> = async (data) => {
        console.log(data);
        const response = await axios.post(`${BASE_URL}/room/create`, {
            username: data.userName,
            roomname: data.roomName
        })

        const message = response.data
        console.log(message)
        if (response.status === 200) {
            router.push(`/dashboard/${data.userName}/room/${message.roomId}`);
        }

    }

    return <>
        <div className="absolute top-0 left-0 bg-transparent backdrop-blur-[0.px]  h-screen w-screen  flex items-center justify-center px-10 "
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

                className="z-50 bg-card-foreground shadow-2xl shadow-black rounded-lg  w-96 py-4 px-6 "
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex gap-1 flex-col mt-4 ">
                            <label htmlFor="username" className="text-lg">Username</label>
                            <input className="bg-black px-2 py-1 rounded border-[0.5px] border-white" type="text" id="username" placeholder="Enter username" {...register("userName", { required: true })} />
                        </div>
                        <div className="flex gap-1 flex-col mt-4 ">
                            <label htmlFor="roomName" className="text-lg">Room Name</label>
                            <input className="bg-black px-2 py-1 rounded border-[0.5px] border-white" type="text" id="roomName" placeholder="Enter room name" {...register("roomName", { required: true })} />
                        </div>
                        <div className="flex justify-center">
                            <Button type="submit" btnType="Primary" name="Create Room" className="mt-8  " />
                        </div>
                    </form>
                </div>
            </motion.div>

        </div>
    </>

}

