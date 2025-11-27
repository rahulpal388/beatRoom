import Image from "next/image";
import { FC } from "react";
import { Button } from "./button";
import { EllipsisVertical, Heart, Play } from "lucide-react";

export interface IShowSongDetails {
  title: string;
  album: string;
  artists: string;
  language: string;
  type: string;
  durations: string;
  image: string;
  url: string;
  released_date: string;
}

// if possible include the released date

export const ShowSongDetails: FC<{ songDetails: IShowSongDetails }> = ({
  songDetails,
}) => {
  return (
    <>
      <div className=" px-32 py-6 flex gap-12 ">
        <div className=" rounded overflow-hidden shadow-2xl  ">
          <Image
            src={songDetails.image}
            alt="image"
            height={100}
            width={100}
            className="size-52"
          />
        </div>
        <div className=" flex flex-col gap-4 pt-6 ">
          <h1 className="text-3xl font-semibold  ">{songDetails.title}</h1>
          <div>
            <p>
              {songDetails.album} by {songDetails.artists}{" "}
            </p>
            <p>
              {songDetails.type}
              <span className="font-extrabold rounded overflow-hidden ">
                &nbsp;&nbsp;·&nbsp;&nbsp;
              </span>
              {songDetails.language}
              <span className="font-extrabold rounded overflow-hidden ">
                &nbsp;&nbsp;·&nbsp;&nbsp;
              </span>
              {Math.trunc(Number(songDetails.durations) / 60)}:
              {Number(songDetails.durations) % 60}
            </p>
            <div className="mt-6 flex  items-center justify-between ">
              <Button
                type="button"
                btnType="Primary"
                name="Play"
                className=" py-3 rounded-xl "
                icon={<Play />}
                onClick={() => {
                  console.log("play song");
                }}
              />
              <Heart className="size-10 stroke-1 cursor-pointer " />
              <EllipsisVertical className="size-8 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
