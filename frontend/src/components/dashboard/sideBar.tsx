"use client";
import { History, Music2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const sideBarBrowseItems = [
  {
    heading: "New Release",
    href: "new-release",
  },
  {
    heading: "Top Playlist",
    href: "top-playlist",
  },
  {
    heading: "Top Album",
    href: "top-album",
  },
  {
    heading: "Top Artists",
    href: "top-artists",
  },
];

const sideBarLibraryItems: {
  heading: string;
  href: string;
  icon: React.ReactNode;
}[] = [
  {
    heading: "Histroy",
    href: "history",
    icon: <History size={20} />,
  },
  {
    heading: "Liked Song",
    href: "liked-song",
    icon: <Music2 size={20} />,
  },
];

export function SideBar() {
  const { userId } = useParams();
  return (
    <div className=" max-lg:hidden dark:bg-card h-full w-[12rem] ">
      <div className=" flex flex-col  px-10  mt-12  ">
        <div>
          <h1 className=" text-lg opacity-60 ">Browse Music</h1>
          <div className=" mt-4 flex flex-col gap-2 ">
            {sideBarBrowseItems.map((items, idx) => (
              <div key={idx}>
                <Link
                  href={`/dashboard/${userId}/${items.href}`}
                  className=" hover:text-neutral-400 "
                >
                  {items.heading}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className=" mt-12 ">
          <h1 className=" text-lg opacity-60 ">My Library</h1>
          <div className=" mt-4 flex flex-col gap-2 ">
            {sideBarLibraryItems.map((items, idx) => (
              <div key={idx}>
                <Link
                  href={`/dashboard/${userId}/${items.href}`}
                  className=" hover:text-neutral-400  flex items-center  gap-2 "
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
