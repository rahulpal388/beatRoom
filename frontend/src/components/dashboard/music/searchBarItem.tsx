import { decodeHTML } from "@/lib/decodeHtml";
import { useSearchStore } from "@/store/searchStore";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function SearchedItems({
  id,
  type,
  className,
}: {
  id: string;
  type: "song" | "playlist" | "album";
  className?: string;
}) {
  const songs = useSearchStore((s) => (type === "song" ? s.songs[id] : null));
  const albums = useSearchStore((s) =>
    type === "album" ? s.albums[id] : null,
  );
  const playlists = useSearchStore((s) =>
    type === "playlist" ? s.playlists[id] : null,
  );

  const items = songs || albums || playlists;
  if (!items) {
    return null;
  }
  const token = items.url.split("/").at(-1);
  const qualityImage = items.image.includes("50x50")
    ? items.image.replace("50x50", "500x500")
    : "";
  // console.log(items.image);
  return (
    <div>
      <Link
        href={`${
          items.type === "song"
            ? `/${items.type}/${token}/search`
            : `/${items.type}/${token}`
        }`}
        className={` px-2 py-2 rounded-sm hover:bg-card-hover   group  flex max-lg:flex-col md:items-center gap-4 hover:bg-bar overflow-hidden w-full  ${className} `}
      >
        <div className=" w-full ">
          {items.image.length === 0 ? (
            <CircleUserRound size={40} className="stroke-1" />
          ) : (
            <Image
              src={qualityImage}
              alt="image"
              height={100}
              width={100}
              className="rounded-lg  w-full h-full   "
            />
          )}
        </div>
        <div>
          <p className="text-xl  md:px-4 line-clamp-1 w-[10rem] max-md:w-[10rem] max-sm:w-[8rem]  ">
            {" "}
            {decodeHTML(items.title)}
          </p>
          <p className="  text-xs md:px-4 dark:group-hover:text-neutral-500 dark:text-neutral-400 line-clamp-1 w-[10rem] max-md:w-[10rem]  max-sm:w-[8rem] ">
            {decodeHTML(items.type === "playlist" ? "" : items.description)}
          </p>
        </div>
      </Link>
    </div>
  );
}

export function SearchedItemsContainer({
  children,
  heading,
}: {
  children: React.ReactNode;
  heading: string;
}) {
  if (Array.isArray(children) && children.length === 0) {
    return null;
  }

  return (
    <>
      <div>
        <h1 className=" text-lg font-medium max-lg:text-xl ">{heading}</h1>
        <div className=" mt-2 grid grid-cols-2 gap-4  sm:grid-cols-3 md:grid-cols-4      ">
          {children}
        </div>
      </div>
    </>
  );
}
