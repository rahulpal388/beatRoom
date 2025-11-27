"use client";
import { motion } from "motion/react";

export function CardSkeleton() {
  const skeletonVarient = {
    initial: { opacity: 0.6 },
    animate: { opacity: 1 },
  };
  return (
    <>
      <div className=" shadow-lg border border-transparent dark:bg-bar  px-4 py-4 h-[16rem] w-[10rem] rounded flex flex-col gap-2 ">
        <motion.div
          variants={skeletonVarient}
          initial="initial"
          animate="animate"
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className=" w-32 h-36 rounded-2xl bg-neutral-700 "
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
          className=" w-full h-4 rounded-2xl  bg-neutral-700 "
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
          className=" mt-px w-full h-4 rounded-2xl  bg-neutral-700 "
        ></motion.div>
      </div>
    </>
  );
}

export function MoreSkeletonCard({ count }: { count: number }) {
  const array = new Array(count).fill(0);
  return (
    <>
      {array.map((_, idx) => (
        <CardSkeleton key={idx} />
      ))}
    </>
  );
}
