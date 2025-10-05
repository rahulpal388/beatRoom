import { MoveLeft } from "lucide-react";
import { Music, TSong } from "./music";
import { Dispatch, SetStateAction } from "react";


export function SearchedMusic({ setQueueSongs }: {
    setQueueSongs: Dispatch<SetStateAction<TSong[]>>
}) {


    return (
        <div>
            <div className="  " >
                <MoveLeft className="size-8 cursor-pointer " />
            </div>

        </div>
    )
}