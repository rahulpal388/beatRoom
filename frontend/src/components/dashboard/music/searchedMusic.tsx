import { MoveLeft } from "lucide-react";
import { Music, TSong } from "./music";
import { Dispatch, SetStateAction } from "react";


export function SearchedMusic({ setSongSearched }: {
    setSongSearched: Dispatch<SetStateAction<boolean>>
}) {


    return (
        <div>
            <div className="  " >
                <MoveLeft className="size-8 cursor-pointer "
                    onClick={() => setSongSearched(false)}
                />
            </div>

        </div>
    )
}