
import { SongQueCard } from "./song-que-card";





export function MVCard({ heading, description, element }: {
    heading: string,
    description: string,
    element: React.ReactNode
}) {

    return (
        <div className=" rounded-sm  w-full border-[1px] bg-neutral-950 border-white  mb-32 overflow-hidden ">
            <div className="flex items-center  justify-center bg-neutral-600 h-48 ">
                <div className="w-full px-4 flex flex-col gap-2 ">
                    {element}

                </div>

            </div>
            <div className=" p-4 ">
                <h1 className="text-2xl font-medium text-neutral-200 ">{heading}</h1>
                <p className=" mt-2 text-sm text-neutral-500  "> {description} </p>
            </div>
        </div >
    )

}
