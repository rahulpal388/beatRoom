import { motion } from "motion/react";

export function ArtistCircleCardSkeleton() {
  const varitents = {
    initial: { opacity: 1 },
    animate: { opacity: 0.6 },
  };
  return (
    <>
      <div className=" w-20 flex flex-col gap-4 items-center justify-center  ">
        <motion.div
          variants={varitents}
          initial="initial"
          animate="animate"
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className=" size-20 bg-neutral-800 rounded-full "
        ></motion.div>
        <motion.div
          variants={varitents}
          initial="initial"
          animate="animate"
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className=" w-full h-4 bg-neutral-800 rounded-2xl  "
        ></motion.div>
      </div>
    </>
  );
}
