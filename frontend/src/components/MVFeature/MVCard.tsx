
import { SongQueCard } from "./song-que-card";





export function MVCard({ heading, description, element }: {
    heading: string,
    description: string,
    element: React.ReactNode
}) {

    return (
        <div className=" rounded-lg  w-full  bg-card overflow-hidden border-[1px] bg-blur-lg dark:bg-card shadow-[0_4px_16px_rgba(0,0,0,0.12)]  ">
            <div className="flex items-center  justify-center bg-neutral-100 h-48 ">
                <div className="w-full px-4 flex flex-col gap-2 ">
                    {element}

                </div>

            </div>
            <div className=" p-4 ">
                <h1 className="text-2xl font-medium  text-foreground dark:text-background  ">{heading}</h1>
                <p className=" mt-2 text-[16px] text-neutral-500  "> {description} </p>
            </div>
        </div >
    )

}
