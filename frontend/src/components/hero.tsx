'use client'

import { MoveUpRight } from "lucide-react";
import { useRouter } from "next/navigation";


export function Hero() {

    const router = useRouter()

    return <>


        <div className=" mt-28 w-full text-center  ">
            <h1 className=" text-6xl font-bold tracking-tighter ">Your room. Your beat. A space to Connect.</h1>
            {/* Stream. Vibe. Together. */}
            <h4 className="mt-6 text-5xl font-medium text-center text-neutral-600 ">BeatRoom lets you listen to music, watch videos, and hang out with friends in real-time with chat, voice, and video.</h4>

            <div className="flex items-center gap-20 justify-center mt-16 ">
                <div>
                    <button className="flex gap-2 bg-secondary-btn-background border-[0.5px] border-secondary-btn-border text-secondary-btn-text px-4 py-2 rounded-lg cursor-pointer hover:text-secondary-btn-hover   ">
                        <span>Join Room</span>

                    </button>
                </div>
                <div>

                    <button className="bg-red-800 px-4 py-2 rounded-lg cursor-pointer "
                        onClick={() => {
                            router.push("signin")
                        }}
                    >Sign Up</button>
                </div>
            </div>
        </div>

    </>


}

