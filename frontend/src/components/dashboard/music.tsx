import Image from "next/image";


export function Musics() {


    return <>

        <div className=" h-full flex   ">
            <div className=" bg-green-400 flex-3 px-6 pt-4 flex flex-col gap-4 ">
                <div className=" h-[18rem] bg-neutral-400 w-full rounded-lg overflow-hidden ">
                    <Image src="/banner.webp" alt="banner" height={100} width={100} className=" w-full h-full object-cover  " />
                </div>
                <div className=" h-[12rem] bg-neutral-400 w-full rounded-lg  px-4 py-2 ">
                    <h1 className=" text-xl font-bold font-heading ">Trending Songs</h1>

                </div>
            </div>
            <div className="bg-blue-600 flex-1 " >
                playlist
            </div>
        </div>
    </>

}