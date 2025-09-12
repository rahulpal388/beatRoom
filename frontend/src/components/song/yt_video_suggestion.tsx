import Image from "next/image"



export function YTVideoSuggestion({ title, thumbnailUrl }: {
    title: string,
    thumbnailUrl: string
}) {

    return <>
        <div className="w-full  relative h-32   rounded-2xl shadow-2xl shadow-amber-500 overflow-hidden cursor-pointer group  ">
            <Image src={thumbnailUrl} alt="image" fill className=" -z-10 group-hover:opacity-50 group-hover:blur-[1px] " />
            <h1 className="w-full h-full absolute top-4 left-2 z-30  text-neutral-100 text-sm opacity-0 group-hover:opacity-100 ">{title}</h1>
        </div>
    </>

}