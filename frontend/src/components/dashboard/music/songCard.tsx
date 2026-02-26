import Image from "next/image";
import { decodeHTML } from "@/lib/decodeHtml";
import Link from "next/link";
import { useQueue } from "@/context/queueContext";
import { getSong } from "@/lib/getSong";
import { PlayBotton } from "@/ui/play";
import { INewReleaseSong, ISong } from "@/types/songType";
import { IPlaylist } from "@/types/playlistType";
import { IAlbum } from "@/types/albumType";
import { IArtistAlbum } from "@/types/artistType";
import { getForwardPageUrl } from "../getForwardPageUrl";
import { SaveItemHeart } from "../saveItemHeart";
import { AddQueueIcon } from "../addQueueIcon";

export function SongCards({
  songs,
  updateState,
}: {
  songs: ISong | IPlaylist | IAlbum | IArtistAlbum | INewReleaseSong;
  updateState: (id: string) => void;
}) {
  const { addQueueAndSetCurrent } = useQueue();
  return (
    <>
      <div
        className={`relative shadow-xl    group px-4 py-4 w-[11rem] md:w-[13rem] lg:w-[14rem]  rounded  hover:bg-card-hover`}
      >
        <div
          className={`absolute top-4 px-4  left-1 z-20 items-center justify-between w-full  flex`}
        >
          <SaveItemHeart
            songs={songs}
            showHeart={false}
            updateState={updateState}
          />
          <div className={`relative pr-2  hidden group-hover:block `}>
            <AddQueueIcon songs={songs} />
          </div>
        </div>
        <div className="  mb-2  w-full    ">
          <Image
            src={
              songs.image.length === 0 ? "/default_card_image.jpg" : songs.image
            }
            alt="image"
            height={100}
            width={100}
            className="w-full h-full group-hover:opacity-30 "
          />

          <PlayBotton
            className=" absolute top-[7rem] md:top-[9rem] lg:top-[10rem] right-[1.2rem]   opacity-0 group-hover:opacity-100 "
            onClick={async () => {
              const song = await getSong(songs);
              addQueueAndSetCurrent(song);
            }}
          />
        </div>

        <Link
          href={getForwardPageUrl(songs)}
          className="  text-[18px] text-text-heading line-clamp-2 leading-[1.4rem] "
        >
          {decodeHTML(songs.title)}

          <p className="  mt-1 text-[0.7rem] text-text-muted line-clamp-2  ">
            {decodeHTML(
              songs.type === "playlist" || songs.type === "userPlaylist"
                ? songs.subtitle
                : songs.type === "song"
                  ? songs.more_info.artistMap.artists
                      .map((x) => x.name)
                      .join(", ")
                  : "",
            )}
          </p>
        </Link>
      </div>
    </>
  );
}

export function SongsSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className=" rounded-lg w-[99%]  px-4 py-2 shadow-soft bg-card  border  border-transparent   ">
        <h1 className=" text-xl text-text-heading font-semibold font-heading ">
          {heading}
        </h1>
        <div className="mt-4   grid grid-flow-col max-sm:grid-rows-1 gap-4  overflow-x-auto  ">
          {children}
        </div>
      </div>
    </>
  );
}
