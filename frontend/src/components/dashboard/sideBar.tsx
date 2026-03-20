"use client";
import {
  Disc,
  History,
  ListMusic,
  Music2,
  PlayCircle,
  UserPlus,
} from "lucide-react";
import Link from "next/link";

type ItemsType = {
  heading: string;
  href: string;
  icon: React.ReactNode;
};

const sideBarBrowseItems: ItemsType[] = [
  {
    heading: "New Release",
    href: "new-release",
    icon: <PlayCircle size={20} strokeWidth={1} />,
  },
  {
    heading: "Top Playlist",
    href: "top-playlist",
    icon: <ListMusic size={20} strokeWidth={1} />,
  },
  {
    heading: "Top Album",
    href: "top-album",
    icon: <Disc size={20} strokeWidth={1} />,
  },
  {
    heading: "Top Artists",
    href: "top-artists",
    icon: <UserPlus size={20} strokeWidth={1} />,
  },
];

const sideBarLibraryItems: ItemsType[] = [
  {
    heading: "Histroy",
    href: "history",
    icon: <History size={20} strokeWidth={1} />,
  },
  {
    heading: "Liked Song",
    href: "liked-song",
    icon: <Music2 size={20} strokeWidth={1} />,
  },
];

export function SideBar() {
  return (
    <div className=" max-lg:hidden border-r-[1px]   h-full w-[12rem] ">
      <div className=" flex flex-col w-full px-4  mt-12 items-center  ">
        <h1 className=" text-lg text-muted font-heading ">Browse Music</h1>
        <div className=" mt-4 flex flex-col  items-center justify-center gap-2  w-full">
          {sideBarBrowseItems.map((items, idx) => (
            <div key={idx}>
              <Link
                href={`/${items.href}`}
                className=" hover:text-foreground/60 flex items-center justify-center  gap-2  "
              >
                {items.icon}
                {items.heading}
              </Link>
            </div>
          ))}
        </div>
        <div className=" mt-12 ">
          <h1 className=" text-lg font-heading text-muted ">My Library</h1>
          <div className=" mt-4 flex flex-col gap-2 ">
            {sideBarLibraryItems.map((items, idx) => (
              <div key={idx}>
                <Link
                  href={`/${items.href}`}
                  className="hover:text-foreground/60   flex items-center  gap-2 "
                >
                  {items.icon} {items.heading}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
