"use client"

import { useAuth } from "@/context/authContext";
import Link from "next/link";
import { SearchBar } from "./music/SearchBar";
import { Copy } from "lucide-react";
import { Button } from "@/ui/button";
import { useRouter } from "next/navigation";
import { ThemeToggleComponent } from "../themeToggleComponent";



export function DashboardNavbar() {
    const { isAuthenticated, currentUser } = useAuth();
    const router = useRouter();

    return (
        <>
            <div className=" bg-background dark:bg-background h-14 border-b-[0.5px] border-muted/70  shadow-xl  flex justify-between items-center gap-4 px-8  ">
                <div>
                    <Link
                        href={`/dashboard`}
                        className=" text-xl  font-extralight italic cursor-pointer "
                    >
                        beatRoom
                    </Link>
                </div>
                <div className=" relative flex items-center gap-4 justify-end max-lg:hidden  ">
                    <SearchBar />
                </div>
                <div className=" flex md:gap-12 gap-8 items-center  ">

                    <div>
                        <ThemeToggleComponent />
                    </div>
                    {isAuthenticated ? (
                        <div className="flex gap-4">
                            <div className=" flex flex-col items-center justify-end ">
                                <h1 className=" text-sm ">
                                    {currentUser?.username}
                                </h1>
                                <p className=" text-[10px] ">
                                    {currentUser?.userId}
                                </p>
                            </div>
                            <div className="font-bold bg-green-700 size-9 rounded-full shadow-2xl flex items-center justify-center ">
                                {currentUser?.username[0].toLocaleUpperCase()}
                            </div>
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
    )

}