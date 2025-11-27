"use client";
import { motion } from "motion/react";

export function ArtistCardSkeleton({ className }: { className?: string }) {
  const skeletonVarient = {
    initial: { opacity: 0.6 },
    animate: { opacity: 1 },
  };
  return (
    <>
      <div
        className={` w-full flex items-center gap-4 dark:bg-bar px-4 py-2 rounded-2xl  ${className}`}
      >
        <motion.div
          variants={skeletonVarient}
          initial="initial"
          animate="animate"
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className=" rounded-2xl size-12 bg-neutral-700 "
        ></motion.div>
        <div className=" w-40 flex flex-col gap-2">
          <motion.div
            variants={skeletonVarient}
            initial="initial"
            animate="animate"
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            className=" rounded-2xl h-4 w-full bg-neutral-700 "
          ></motion.div>
          <motion.div
            variants={skeletonVarient}
            initial="initial"
            animate="animate"
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            className=" rounded-2xl h-4 w-full bg-neutral-700 "
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
      {array.map((_, idx) => (
        <ArtistCardSkeleton key={idx} />
      ))}
    </>
  );
}
