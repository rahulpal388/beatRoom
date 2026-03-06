"use client";
import { easeInOut, motion, useMotionValue, useTransform } from "motion/react";

export function DisplaySongSkeleton() {
  return (
    <div className="w-full mt-8 px-4 sm:px-8 lg:px-20">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Skeleton */}
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
          className="w-full lg:w-[15rem] h-[12rem] bg-neutral-300 rounded-2xl"
        />

        {/* Text + Buttons */}
        <div className=" md:mt-4   flex flex-col ">
          <div className="flex flex-col gap-4 max-md:items-center ">
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
              className="w-full lg:w-[32rem] h-6 bg-neutral-300 rounded-2xl"
            />
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
              className="w-4/6 lg:w-[24rem] h-6 bg-neutral-300 rounded-2xl"
            />
          </div>
          <div className="flex  gap-4 items-center max-md:justify-center md:mt-8 mt-4  ">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
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
                className="w-[3rem] h-[2rem] bg-neutral-300 rounded-2xl"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
