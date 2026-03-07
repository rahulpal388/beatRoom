import { Compass, House, Music4, Search } from "lucide-react";
import Link from "next/link";

type BottomSideBarItemType = {
  title: string;
  link: string;
  icon: React.ReactNode;
};

const bottomSIdeBarItems: BottomSideBarItemType[] = [
  {
    title: "Home",
    link: "/",
    icon: <House className=" stroke-1 " />,
  },
  {
    title: "Search",
    link: "/search",
    icon: <Search className=" stroke-1 " />,
  },
  {
    title: "Browse",
    link: "/browse",
    icon: <Compass className=" stroke-1 " />,
  },
  {
    title: "My Library",
    link: "/my-library",
    icon: <Music4 className=" stroke-1 " />,
  },
];

export function BottomSideBar() {
  return (
    <>
      <div className="bg-card z-50 lg:hidden w-full h-12 fixed bottom-0 bg-bar flex border-t-[0.5px] border-card-border ">
        <div className="w-full flex items-center justify-between sm:px-20 px-8  ">
          {bottomSIdeBarItems.map((x, idx) => (
            <div
              key={idx}
              className=" flex flex-col items-center cursor-pointer "
            >
              <Link href={x.link}>
                {x.icon}
                <p className=" text-xs text-neutral-400 ">{x.title}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
