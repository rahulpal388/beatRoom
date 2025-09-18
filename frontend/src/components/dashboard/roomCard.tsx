


export function RoomCard() {

    return <>

        <div className="  shadow-2xl rounded overflow-hidden dark:hover:bg-accent-foreground/30  ">
            <div className=" h-[12rem] bg-neutral-600  w-full flex items-center justify-center ">
                Image
            </div>
            <div className=" py-4 px-4 flex flex-col gap-4 ">
                <div >
                    <div className=" flex items-center justify-between ">
                        <h1 className="text-lg">Party Music</h1>
                        <button className="cursor-pointer dark:bg-accent-foreground/50 dark:hover:bg-accent-foreground rounded px-2 py-[6px] text-xs  shadow-sm " >Link</button>
                    </div>
                    <p className="mt-2 text-xs text-neutral-600 " >Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod libero quae exercitationem ex maiores praesentium magnam laudantium corrupti excepturi.</p>
                </div>
                <div className="  flex items-center justify-between ">
                    <button className=" px-4 py-[6px] dark:bg-primary dark:hover:bg-primary/70 rounded cursor-pointer ">Join</button>
                    <button className=" px-4 py-[6px] dark:bg-accent-foreground/70 dark:hover:bg-accent-foreground rounded  cursor-pointer">customize</button>
                </div>
            </div>
        </div>
    </>
}