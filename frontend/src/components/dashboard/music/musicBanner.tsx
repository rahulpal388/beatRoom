import { INewRelease } from "@/types/songType";
import { Play } from "lucide-react";
import Image from "next/image";

export function MusicBanner({ song }: { song: INewRelease[] }) {
  console.log(song);
  const songLength = song.length;
  console.log(song[0].image);
  return (
    <>
      <div className=" relative flex h-[20rem] items-center justify-center  md:mt-8 w-full ">
        <BannerContainer type="first" className=" max-md:hidden ">
          <BannerImages
            info={false}
            image={song[3].image}
            title={song[3].title}
            artist={song[3].more_info.artistMap.artists
              .map((x) => x.name)
              .join(",")}
          />
        </BannerContainer>
        <BannerContainer type="second">
          <BannerImages
            info={false}
            image={song[1].image}
            title={song[1].title}
            artist={song[1].more_info.artistMap.artists
              .map((x) => x.name)
              .join(",")}
          />
        </BannerContainer>
        <BannerContainer type="third">
          <BannerImages
            info={true}
            image={song[0].image}
            title={song[0].title}
            artist={song[0].more_info.artistMap.artists
              .map((x) => x.name)
              .join(",")}
          />
        </BannerContainer>
        <BannerContainer type="fourth">
          <BannerImages
            info={false}
            image={song[2].image}
            title={song[2].title}
            artist={song[2].more_info.artistMap.artists
              .map((x) => x.name)
              .join(",")}
          />
        </BannerContainer>
        <BannerContainer type="fifth" className=" max-md:hidden ">
          <BannerImages
            info={false}
            image={song[4].image}
            title={song[4].title}
            artist={song[4].more_info.artistMap.artists
              .map((x) => x.name)
              .join(",")}
          />
        </BannerContainer>
      </div>
    </>
  );
}

function BannerImages({
  info,
  image,
  title,
  artist,
}: {
  info: boolean;
  image: string;
  title: string;
  artist: string;
}) {
  return (
    <div>
      <Image
        src={image}
        alt="banner"
        height={300}
        width={300}
        className=" w-full h-full   "
      />
      {info && (
        <div className=" absolute bottom-0 px-4 py-2 rounded-t-xl flex items-center justify-center gap-4 dark:bg-bar w-full h-[6rem] ">
          <div>
            <h1 className=" text-[22px] font-medium max-w-[12rem] line-clamp-2 dark:text-secondary-foreground   ">
              {title}
            </h1>
            <p className=" text-[10px] text-muted/60 line-clamp-2 ">{artist}</p>
          </div>
          <div>
            <button className=" bg-green-700 font-bold cursor-pointer  rounded-full p-2 flex items-center justify-center gap-2 ">
              {" "}
              <Play />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const containerStyle = {
  first: "left-4 z-10 scale-70 ",
  second: "left-32 max-md:left-0 z-20 scale-85  ",
  third: " z-30  ",
  fourth: "right-32 max-md:right-0 z-20 scale-85  ",
  fifth: "right-4 scale-70 z-10   ",
};

function BannerContainer({
  type,
  children,
  className,
}: {
  type: "first" | "second" | "third" | "fourth" | "fifth";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`absolute ${containerStyle[type]} ${className} overflow-hidden border-[1px]  border-neutral-300  rounded-3xl   h-[20rem] max-sm:h-[14rem] max-sm:w-[14rem] max-md:h-[18rem] max-lg:w-[18rem]  w-[22rem]`}
    >
      {children}
    </div>
  );
}
