"use client";
import { motion } from "motion/react";

export function ArtistCardSkeleton({ className }: { className?: string }) {
  return (
    <>
      <div
        className={` w-full flex flex-col items-center gap-4 dark:bg-bar px-4 py-2 rounded-2xl  ${className}`}
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
          className=" rounded-full size-20 bg-neutral-300 "
        ></motion.div>
        <div className=" w-28 flex flex-col gap-2">
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
            className=" rounded-2xl h-4 w-full bg-neutral-300 "
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
            className=" rounded-2xl h-4 w-full bg-neutral-300 "
          ></motion.div>
        </div>
      </div>
    </>
  );
}

export function MoreArtistCardSkeleton({ count }: { count: number }) {
  const array = new Array(count).fill(0);
  return (
    <>
      <div className=" mt-4 grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7  ">
        {array.map((_, idx) => (
          <ArtistCardSkeleton key={idx} />
        ))}
      </div>
    </>
  );
}
