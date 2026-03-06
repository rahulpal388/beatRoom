"use client";
import { motion } from "motion/react";

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <>
      <div
        className={` shadow-lg border border-transparent dark:bg-bar  px-4 py-4 h-[16rem] w-[12rem]  rounded flex flex-col gap-2 ${className} `}
      >
        <motion.div
          style={{
            backgroundImage:
              "linear-gradient(-45deg, transparent 40%, #f0f0f0 50%, transparent 60%)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "linear",
          }}
          className=" w-full h-36 rounded-2xl bg-neutral-300 "
        ></motion.div>
        <motion.div
          style={{
            backgroundImage:
              "linear-gradient(-45deg, transparent 40%, #f0f0f0 50%, transparent 60%)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "linear",
          }}
          className=" w-full h-4 rounded-2xl  bg-neutral-300 "
        ></motion.div>
        <motion.div
          style={{
            backgroundImage:
              "linear-gradient(-45deg, transparent 40%, #f0f0f0 50%, transparent 60%)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "linear",
          }}
          className=" mt-px w-full h-4 rounded-2xl  bg-neutral-300 "
        ></motion.div>
      </div>
    </>
  );
}
