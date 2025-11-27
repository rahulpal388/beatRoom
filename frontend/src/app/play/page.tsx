"use client";
import { CardSkeleton, MoreSkeletonCard } from "@/ui/cardSkeleton";
import { motion } from "motion/react";

export default function Player() {
  const skeletonVarient = {
    initial: { opacity: 0.6 },
    animate: { opacity: 1 },
  };
  return (
    <div className=" flex items-center justify-center h-screen w-screen ">
      <div className=" w-3xl flex items-center gap-4 bg-card px-4 py-2 rounded-2xl ">
        <motion.div
          variants={skeletonVarient}
          initial="initial"
          animate="animate"
          transition={{
            duration: 3,
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
              duration: 3,
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
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            className=" rounded-2xl h-4 w-full bg-neutral-700 "
          ></motion.div>
        </div>
      </div>
    </div>
  );
}
