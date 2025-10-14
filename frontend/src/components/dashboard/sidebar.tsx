"use client";
import { sideBarItems } from "@/app/dashboard/[userId]/page";
import { useAuth } from "@/context/authContext";
import { useSideBar } from "@/context/sidebarContext";
import axios from "axios";
import { LogOut, PanelLeftClose, PanelRightClose } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Sidebar() {
  const [isSideWindow, setSideWindow] = useState<boolean>(true);
  const { setAuthenticated, setCurrentUser } = useAuth();
  const router = useRouter();
  const { setCurrentItem, currentItem } = useSideBar();

  const onLogout = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/v1/auth/logout",
      { withCredentials: true }
    );

    console.log(response.data);

    if (response.status === 200) {
      setAuthenticated(false);
      setCurrentUser(null);
      router.push("/");
    }
  };

  return (
    <>
      <div
        className={`relative max-md:hidden   py-2  dark:shadow-2xl ${
          isSideWindow ? " xl:w-[12rem] px-4 " : "w-20 px-2 "
        } `}
      >
        <div className="flex justify-end ">
          {isSideWindow ? (
            <PanelLeftClose
              className=" cursor-pointer size-6 "
              onClick={() => {
                setSideWindow(false);
              }}
            />
          ) : (
            <PanelRightClose
              className=" cursor-pointer size-6 "
              onClick={() => {
                setSideWindow(true);
              }}
            />
          )}
        </div>
        <div className=" mt-20 flex flex-col gap-2 ">
          {sideBarItems.map((items, index) => (
            <div
              key={index}
              className={`   py-2 rounded flex items-center gap-4   cursor-pointer 
                            ${!isSideWindow ? " justify-center " : " px-2 "}
                             ${
                               currentItem === items.link
                                 ? " bg-primary dark:bg-primary text-accent-foreground "
                                 : "dark:hover:bg-accent-foreground "
                             } `}
              onClick={() => {
                setCurrentItem(items.link);
              }}
            >
              {items.logo}

              <h1 className={`xl:text-xl ${!isSideWindow && "hidden"} `}>
                {items.name}
              </h1>
            </div>
          ))}

          <div className=" absolute bottom-12 left-4 ">
            {isSideWindow ? (
              <button
                className=" bg-red-800 text-white px-6 py-2 rounded cursor-pointer "
                onClick={onLogout}
              >
                Logout
              </button>
            ) : (
              <div
                className=" bg-red-800 w-12 h-8 flex justify-center items-center rounded cursor-pointer  "
                onClick={onLogout}
              >
                <LogOut />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
