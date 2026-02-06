import { CircleUser } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";


export function ArtistCard({
  name,
  image,
  type,
  url,
}: {
  image: string;
  name: string;
  type: string;
  url: string;
}) {
  return (
    <>
      <div className=" w-[10rem]   py-[1px] px-2 rounded-lg overflow-hidden   flex flex-col items-center justify-center     ">
        <Link
          href={`/dashboard/artist/${url.split("/").at(-1)}`}
          className=" md:text-xl text-lg cursor-pointer hover:text-text-body flex flex-col gap-2 items-center "
        >
          {image.length > 0 ? (
            <Image
              src={image}
              alt="artist"
              height={100}
              width={100}
              className="rounded-full  h-[6rem] w-[6rem] "
            />
          ) : (
            <CircleUser className="rounded-full  h-[4rem] w-[4rem] " />
          )}
          <span className="text-center ">{name}</span>
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
      <div className=" mt-2 w-full grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 grid-cols-2  items-center gap-6 justify-between ">
        {children}
      </div>
    </>
  );
}
