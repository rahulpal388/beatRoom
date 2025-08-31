"use client"
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";



export function NavBar() {

    const router = useRouter()

    return <>

        <div className="flex justify-between itmes-center   ">
            <div>
                <h1 className="text-xl  text-red-800  ">BeatRoom</h1>
            </div>
            <div className="flex items-center gap-12  max-lg:hidden ">

                <h1>Home</h1>
                <h1>Join Room</h1>
                <h1>Feature</h1>
                <h1>About</h1>
            </div>
            <div className="flex items-center gap-8 max-lg:hidden ">

                <button className=" cursor-pointer flex items-center gap-2 justify-center border-[1px] border-secondary-btn-border text-secondary-btn-text  bg-secondary-btn-background px-4 py-1 rounded  ">
                    <Plus />
                    <span>Create Room</span>
                </button>

                <button className=" cursor-pointer bg-red-800  px-4 py-1 rounded shadow-xs shadow-green-400   "
                    onClick={() => {
                        router.push("/login")
                    }}
                >Login</button>
            </div>
        </div>

    </>


}
