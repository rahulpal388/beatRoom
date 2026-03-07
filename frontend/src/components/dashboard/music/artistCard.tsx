import { decodeHTML } from "@/lib/decodeHtml";
import { CircleUser } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ArtistCard({
  name,
  image,
  url,
}: {
  image: string;
  name: string;
  type: string;
  url: string;
}) {
  return (
    <>
      <div className=" w-[10rem]   py-[1px] px-2 rounded-lg overflow-hidden      ">
        <Link
          href={`/artist/${url.split("/").at(-1)}`}
          className=" md:text-xl text-lg cursor-pointer hover:text-text-body flex flex-col gap-2 items-center "
        >
          {image.length > 0 ? (
            <Image
              src={image}
              alt="artist"
              height={100}
              width={100}
              className="rounded-full peer  h-[6rem] w-[6rem] shadow-lg "
            />
          ) : (
            <CircleUser className="rounded-full  h-[4rem] w-[4rem] " />
          )}
          <span className="text-center peer-hover:opacity-70 hover:opacity-70 ">
            {decodeHTML(name)}
          </span>
        </Link>
      </div>
    </>
  );
}

export function ArtistCardContaier({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mt-2 pb-12 w-full gap-4 grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 grid-cols-2  ">
        {children}
      </div>
    </>
  );
}
