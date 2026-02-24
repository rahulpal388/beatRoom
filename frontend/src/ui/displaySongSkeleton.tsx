"use client";
import { easeInOut, motion } from "motion/react";

export function DisplaySongSkeleton() {
  const skeletonVariant = {
    initial: { opacity: 0.6 },
    animate: { opacity: 1 },
  };

  const transition = {
    duration: 1.5,
    ease: easeInOut,
    repeat: Infinity,
  };

  return (
    <div className="w-full mt-8 px-4 sm:px-8 lg:px-20">
      <div className="flex flex-col lg:flex-row gap-8">

        {/* Image Skeleton */}
        <motion.div
          variants={skeletonVariant}
          initial="initial"
          animate="animate"
          transition={transition}
          className="w-full lg:w-[15rem] h-[12rem] bg-neutral-700 rounded-2xl"
        />

        {/* Text + Buttons */}
        <div className="flex-1 mt-4">
          <div className="flex flex-col gap-4">

            <motion.div
              variants={skeletonVariant}
              initial="initial"
              animate="animate"
              transition={transition}
              className="w-full lg:w-[32rem] h-6 bg-neutral-700 rounded-2xl"
            />

            {/* <motion.div
              variants={skeletonVariant}
              initial="initial"
              animate="animate"
              transition={transition}
              className="w-5/6 lg:w-[28rem] h-6 bg-neutral-700 rounded-2xl"
            /> */}

            <motion.div
              variants={skeletonVariant}
              initial="initial"
              animate="animate"
              transition={transition}
              className="w-4/6 lg:w-[24rem] h-6 bg-neutral-700 rounded-2xl"
            />
          </div>

          <div className="flex flex-wrap gap-4 items-center mt-12">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                variants={skeletonVariant}
                initial="initial"
                animate="animate"
                transition={transition}
                className="w-[3rem] h-[2rem] bg-neutral-700 rounded-2xl"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}