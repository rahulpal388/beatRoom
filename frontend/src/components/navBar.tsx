"use client"
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";


export function NavBar() {
    const router = useRouter()

    return <>

        <div className="flex justify-between itmes-center   ">
            <div className="flex gap-20">

                <div>
                    <h1 className="text-xl  text-red-800 font-extrabold  ">BeatRoom</h1>
                </div>
                <div className="flex items-center gap-12 font-light  max-lg:hidden ">

                    <h1 className="cursor-pointer">Home</h1>
                    <h1 className="cursor-pointer">Join Room</h1>
                    <h1 className="cursor-pointer">Feature</h1>
                </div>
            </div>
            <div className="flex items-center gap-8  ">

                <button className=" cursor-pointer max-sm:text-xs flex items-center sm:gap-2 justify-center border-[1px] border-secondary-btn-border text-secondary-btn-text  bg-secondary-btn-background lg:px-4 px-1 py-1 rounded  "
                    onClick={() => {
                        // TODO: handle create room action
                    }}
                >
                    <Plus />
                    <span>Create Room</span>
                </button>
                <button className="max-lg:hidden cursor-pointer bg-red-800  px-4 py-1 rounded shadow-xs shadow-green-400   "
                    onClick={() => {
                        router.push("/login")
                    }}
                >Login</button>
            </div>
        </div>

    </>


}
