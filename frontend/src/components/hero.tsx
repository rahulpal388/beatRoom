import { MoveUpRight } from "lucide-react";



export function Hero() {

    return <>


        <div className=" mt-28 w-full text-center  ">
            <h1 className=" text-6xl font-bold ">Stream. Share. Vibe with Friends</h1>
            <h4 className="mt-6 text-lg ">Sync your favorite tracks from YouTube, Spotify & more — listen, vibe, and connect in real time.</h4>

            <div className="flex items-center gap-28 justify-center mt-16 ">
                <div>
                    <button className="flex gap-2 bg-secondary-btn-background border-[0.5px] border-secondary-btn-border text-secondary-btn-text px-4 py-2 rounded-lg cursor-pointer hover:text-secondary-btn-hover   ">
                        <span>Try Now</span>
                        <MoveUpRight className="stroke-[0.9px] " />
                    </button>
                </div>
                <div>
                    <button className="bg-red-800 px-4 py-2 rounded-lg  ">SignUp for free</button>
                </div>
            </div>
        </div>

    </>


}

