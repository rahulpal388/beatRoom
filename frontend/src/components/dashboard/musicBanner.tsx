import { Play } from "lucide-react";
import Image from "next/image";


export function MusicBanner() {

    return <>
        <div className=" relative h-full w-full shadow-[0_6px_20px_oklch(10%_0.01_286.19_/_0.6)] ">
            <Image src="https://lastfm.freetls.fastly.net/i/u/ar0/4583932b753c96d0d2f22fe9774e5ef3.jpg" alt="banner" height={100} width={100} className=" w-full h-full object-cover  " />
            <div className=" absolute bottom-4 left-4 flex flex-col gap-4 ">
                <div>
                    <h1 className=" text-3xl font-bold max-w-[16rem]   ">Hamari Adhuri Kahani</h1>
                    <p className=" text-md text-neutral-400 ">Arjit singh</p>
                </div>
                <div>
                    <button className=" bg-green-700 font-bold cursor-pointer rounded px-4 py-2 flex items-center justify-center gap-2 "> <Play /> Play</button>
                </div>
            </div>
        </div>
    </>
}