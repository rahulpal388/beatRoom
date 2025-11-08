import { Play } from "lucide-react";
import Image from "next/image";
import { Button } from "../../ui/button";

const Song = [
  {
    song: "Blinding Lights",
    artist: "The Weeknd",
  },
  {
    song: "Shape of You",
    artist: "Ed Sheeran",
  },
  {
    song: "Believer",
    artist: "Imagine Dragons",
  },
];

export function SongQueue() {
  return (
    <div className="flex flex-col h-full justify-center items-center   gap-2">
      <Image
        src="/song_queue.png"
        alt="image"
        height={100}
        width={100}
        className=" lg:w-full h-full w-[23rem] "
      />
      {/* {Song.map((x, i) => (
                <SongQueCard key={i} song={x.song} artist={x.artist} />
            ))} */}
    </div>
  );
}

export function SongQueCard({
  song,
  artist,
}: {
  song: string;
  artist: string;
}) {
  return (
    <div className="w-full h-10 bg-neutral-200 rounded  pr-4 flex gap-4 items-center justify-between overflow-hidden ">
      <div className="flex items-center justify-between gap-2 ">
        <div>
          <Image src="/divide.png" alt="image" width={50} height={50} />
        </div>
        <div>
          <h1 className="text-sm">{song}</h1>
          <p className="text-xs  ">{artist}</p>
        </div>
      </div>
      <div className="flex gap-4 items-center justify-center ">
        <Play />

        <Button btnType="Primary" name="add" />
      </div>
    </div>
  );
}
