import Image from "next/image";
import { Button } from "../ui/button";





export function PlaySong() {
    return (
        <div className="relative flex items-center justify-center ">
            <Button name="Play Song" btnType="Primary" />
            <div className="absolute -top-14 left-0 ">
                <Image src="/spotify.png" alt="spotify" width={50} height={50} />
            </div>
            <div className="absolute  top-12 right-0 ">
                <Image src="/youtube.png" alt="youtube" width={50} height={50} />
            </div>
        </div>
    )
}
