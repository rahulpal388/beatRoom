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
          className=" md:text-xl text-lg cursor-pointer hover:text-text-body flex flex-col gap-2 items-center group "
        >
          {image.length > 0 ? (
            <Image
              src={image}
              alt="artist"
              height={100}
              width={100}
              className="rounded-full  group-hover:opacity-70 h-[8rem] w-[8rem] shadow-lg "
            />
          ) : (
            <CircleUser className="rounded-full  h-[4rem] w-[4rem] " />
          )}
          <span className="text-center group-hover:opacity-70  text-[16px] font-semibold  ">
            {decodeHTML(name)}
          </span>
        </Link>
      </div>
    </>
  );
}

export function ArtistCardContaier({
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
      <div className="  rounded-lg w-[99%]  sm:px-4 py-2     ">
        <h1 className=" text-2xl text-text-heading font-semibold font-heading   ">
          {heading}
        </h1>
        <div className="mt-2 pb-12 w-full gap-4 grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 grid-cols-2  ">
          {children}
        </div>
        {/* <div className="mt-4   grid grid-flow-col max-sm:grid-rows-1 gap-4  overflow-x-auto  ">
          {children}
        </div> */}
      </div>
    </>
  );
}
