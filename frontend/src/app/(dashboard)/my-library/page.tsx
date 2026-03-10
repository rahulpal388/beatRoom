"use client";
import { logoutUser } from "@/api/auth/logoutUser";
import { useAuth } from "@/context/authContext";
import { useToastNotification } from "@/context/toastNotificationContext";
import { ChevronRight, Disc, ListMusic, Mic, Music, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type IMyLibraryItems = {
  title: string;
  icon: React.ReactNode;
  link: string;
};

const libraryItems: IMyLibraryItems[] = [
  {
    title: "Liked Song",
    icon: <Music />,
    link: "/my-library/song",
  },
  {
    title: "Playlist",
    icon: <ListMusic />,
    link: "/my-library/playlist",
  },
  {
    title: "Album",
    icon: <Disc />,
    link: "/my-library/album",
  },
  {
    title: "Artist",
    icon: <Mic />,
    link: "/my-library/artist",
  },
];

export default function MyLibrary() {
  const { toastMessage } = useToastNotification();
  const { removeAuthenticatedUser, isAuthenticated, currentUser } = useAuth();
  const router = useRouter();
  return (
    <>
      <div className=" py-6  ">
        <div className=" overflow-y-scroll h-screen ">
          <div className=" flex flex-col items-center justify-center border-b-[1px] border-primary/20 pb-8 ">
            {isAuthenticated ? (
              <>
                <div className=" h-24 w-24 rounded-full bg-green-900 flex items-center justify-center ">
                  {currentUser?.profile_image ? (
                    <Image
                      alt="Img"
                      src={currentUser.profile_image}
                      height={100}
                      width={100}
                      className="md:h-[14rem] md:w-[15rem] sm:h-[10rem] sm:w-[10rem]   h-[10rem]  w-[10rem] rounded-full"
                    />
                  ) : (
                    <p className=" text-6xl">
                      {currentUser?.username[0].toUpperCase()}
                    </p>
                  )}
                </div>
                <div className="  mt-4 flex flex-col items-center">
                  <p className=" text-2xl  ">{currentUser!.username}</p>
                  <p className="  ">{currentUser!.userId}</p>
                </div>
              </>
            ) : (
              <div className=" flex flex-col items-center justify-center ">
                <div className=" h-24 w-24 p-4 rounded-full bg-neutral-400 flex items-center justify-center border-[1px] border-primary/30 ">
                  <User className=" size-full  stroke-1 " />
                </div>
                <p className=" mt-2 text-2xl ">Profile</p>
              </div>
            )}
          </div>

          <div className=" mt-4 ">
            <ul className=" flex flex-col gap-2 ">
              {libraryItems.map((x, idx) => (
                <Link href={x.link} key={idx} className=" active:bg-primary ">
                  <li className=" h-14 bg-card shadow-sm  hover:bg-card-hover w-full text-xl px-4 flex items-center justify-between ">
                    <p className=" flex gap-2 items-center justify-center ">
                      {x.icon}
                      {x.title}
                    </p>
                    <ChevronRight />
                  </li>
                </Link>
              ))}
            </ul>
            <div className=" mt-4 px-8 ">
              {isAuthenticated ? (
                <button
                  className=" w-full h-12 bg-red-500 rounded-2xl text-xl cursor-pointer hover:opacity-80  "
                  onClick={async () => {
                    const isLogout = await logoutUser();
                    if (isLogout) {
                      toastMessage({
                        message: "Logout Successfull",
                        type: "success",
                      });
                      removeAuthenticatedUser();
                    } else {
                      toastMessage({
                        message: "Error Logout",
                        type: "success",
                      });
                    }
                  }}
                >
                  Logout
                </button>
              ) : (
                <div className="  ">
                  <button
                    className=" min-w-full h-12 bg-primary rounded-2xl text-xl cursor-pointer hover:opacity-80  "
                    onClick={() => {
                      router.push("/signup");
                    }}
                  >
                    Signup
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
