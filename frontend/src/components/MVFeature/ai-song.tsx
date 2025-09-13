import Image from "next/image";


export function AiSong() {

    return (

        <div className="flex h-full items-center justify-center">
            <Image src="/ai_song.png" alt="image" height={100} width={100} className=" lg:w-full w-[25rem] h-full " />
        </div>
    )
}
