import { useToastNotification } from "@/context/toastNotificationContext";
import { formateTime } from "@/lib/formateTime";
import { saveSong } from "@/lib/saveSong";
import { ISong } from "@/types/songType";
import { Ellipsis, GripVertical, Heart } from "lucide-react";
import Image from "next/image";

export function QueueCards({
  song,
  updateState,
}: {
  song: ISong;
  updateState: (id: string) => void;
}) {
  const { setMessage, setNotification, setType } = useToastNotification();
  return (
    <>
      <div className="  flex items-center  justify-between gap-4  hover:bg-card-hover rounded-lg py-1 px-2 font-body    shadow-md ">
        <div className="flex items-center gap-2   ">
          <GripVertical className=" cursor-grab    " size={50} />
          <Image
            src={song.image}
            alt="image"
            height={40}
            width={40}
            className=" rounded"
          />
          <div>
            <h1 className="text-md text-text-heading font-heading  max-[16rem]  line-clamp-1 cursor-pointer ">
              {song.title}
            </h1>
            <p className=" text-[0.7rem]  text-text-muted max-w-[16rem] line-clamp-1 ">
              {song.more_info.artistMap.artists.map((x) => x.name).join(", ")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-8  ">
          <Heart
            className={`cursor-pointer max-md:hidden  ${
              song.isLiked ? "fill-red-700 stroke-0 " : ""
            }`}
            onClick={async () => {
              const response = await saveSong(song);
              setNotification(true);
              if (response) {
                setMessage("Song Saved");
                setType("success");
                updateState(song.id);
              } else {
                setMessage("Song Not Saved");
                setType("error");
              }
            }}
          />
          <p className=" max-sm:hidden ">
            {formateTime(song.more_info.duration)}
          </p>
          <Ellipsis className=" cursor-pointer " />
        </div>
      </div>
    </>
  );
}
