"use client";
import { Music } from "@/components/dashboard/music/music";
import { api } from "@/lib/checkEnv";

export default function MainPage() {

  console.log("hello main is running")
  console.log(api)
  return (
    <>
      <div className=" md:px-4 px-1  w-full    ">
        <Music />
      </div>
    </>
  );
}
