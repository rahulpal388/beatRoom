import { PanelLeftClose, PanelRightClose } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";


export function VideoChat({ isVideoChat, setIsVideoChat }: {
    isVideoChat: boolean,
    setIsVideoChat: Dispatch<SetStateAction<boolean>>
}) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return <>
        <div className={`flex-1 flex bg-neutral-800 `}>
            {/* <div className="w-12 h-full bg-amber-400 ">
            </div> */}
            <div className="w-full  flex items-center justify-center  ">
                video streaming
            </div>
        </div>
    </>

}