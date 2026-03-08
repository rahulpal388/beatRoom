"use client";

import { useAuth } from "@/context/authContext";
import Link from "next/link";
import { SearchBar } from "./music/SearchBar";
import { Button } from "@/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { logoutUser } from "@/api/auth/logoutUser";
import { useToastNotification } from "@/context/toastNotificationContext";
import { ThemeToggleComponent } from "../themeToggleComponent";
import Image from "next/image";

export function DashboardNavbar() {
  const { isAuthenticated, currentUser, removeAuthenticatedUser } = useAuth();
  const { toastMessage } = useToastNotification();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className=" bg-background dark:bg-background h-14 border-b-[0.5px] border-muted/70  shadow-xl  flex justify-between items-center gap-4 px-8  ">
        <div>
          <Link
            href={`/`}
            className=" text-xl  font-extralight italic cursor-pointer "
          >
            {/* beatRoom */}
            <Image src={"/logo.png"} alt="logo" height={100} width={100} />
          </Link>
        </div>
        <div className=" relative flex items-center gap-4 justify-end max-lg:hidden  ">
          <SearchBar />
        </div>
        <div className=" flex md:gap-12 gap-8 items-center  ">
          {isAuthenticated ? (
            <div className="flex gap-4 items-center">
              <div className=" flex flex-col items-center justify-end ">
                <h1 className=" text-sm ">{currentUser?.username}</h1>
                <p className=" text-[10px] ">{currentUser?.userId}</p>
              </div>
              <div className=" relative   p-2 ">
                <button
                  className="  cursor-pointer bg-green-700 size-9 rounded-full shadow-2xl flex items-center justify-center "
                  onClick={() => {
                    setOpen((prev) => !prev);
                  }}
                >
                  {currentUser?.username[0].toLocaleUpperCase()}
                </button>
              </div>
              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      height: 0,
                    }}
                    animate={{
                      opacity: 1,
                      height: 60,
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                    }}
                    className="overflow-hidden z-40 py-2 bg-card shadow-2xl  w-32 absolute  top-14 right-4  "
                  >
                    <button
                      className="py-2 w-full cursor-pointer hover:bg-primary/40  "
                      onClick={async () => {
                        const response = await logoutUser();
                        if (response) {
                          removeAuthenticatedUser();
                          toastMessage({
                            message: "Logout successfully",
                            type: "success",
                          });
                        } else {
                          toastMessage({
                            message: "Error logout",
                            type: "error",
                          });
                        }
                      }}
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Button
              name="Login"
              btnType="Primary"
              type="button"
              onClick={() => {
                router.push("/login");
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}
