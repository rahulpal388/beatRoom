"use client";
import { motion } from "motion/react";

export function DisplaySongSkeleton() {
  const skeletonVarient = {
    initial: { opacity: 0.6 },
    animate: { opacity: 1 },
  };
  return (
    <>
      <div className=" w-full  h-[15rem] px-20 mt-8 flex gap-8  ">
        <motion.div
          variants={skeletonVarient}
          initial="initial"
          animate="animate"
          transition={{
            duration: 2,
            ease: "backInOut",
            repeat: Infinity,
          }}
          className=" w-[15rem] h-full bg-neutral-700 rounded-2xl  "
        ></motion.div>
        <div className=" mt-4 ">
          <div className=" flex flex-col gap-4 ">
            <motion.div
              variants={skeletonVarient}
              initial="initial"
              animate="animate"
              transition={{
                duration: 2,
                ease: "backInOut",
                repeat: Infinity,
              }}
              className=" w-[32rem] h-6 bg-neutral-700 rounded-2xl "
            ></motion.div>
            <motion.div
              variants={skeletonVarient}
              initial="initial"
              animate="animate"
              transition={{
                duration: 2,
                ease: "backInOut",
                repeat: Infinity,
              }}
              className=" w-[28rem] h-6 bg-neutral-700 rounded-2xl "
            ></motion.div>
            <motion.div
              variants={skeletonVarient}
              initial="initial"
              animate="animate"
              transition={{
                duration: 2,
                ease: "backInOut",
                repeat: Infinity,
              }}
              className=" w-[24rem] h-6 bg-neutral-700 rounded-2xl "
            ></motion.div>
          </div>
          <div className=" flex gap-12 items-center mt-12 ">
            <motion.div
              variants={skeletonVarient}
              initial="initial"
              animate="animate"
              transition={{
                duration: 2,
                ease: "backInOut",
                repeat: Infinity,
              }}
              className=" w-24 h-12 bg-neutral-700 rounded-2xl "
            ></motion.div>
            <motion.div
              variants={skeletonVarient}
              initial="initial"
              animate="animate"
              transition={{
                duration: 2,
                ease: "backInOut",
                repeat: Infinity,
              }}
              className=" w-24 h-12 bg-neutral-700 rounded-2xl "
            ></motion.div>
            <motion.div
              variants={skeletonVarient}
              initial="initial"
              animate="animate"
              transition={{
                duration: 2,
                ease: "backInOut",
                repeat: Infinity,
              }}
              className=" w-24 h-12 bg-neutral-700 rounded-2xl "
            ></motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
