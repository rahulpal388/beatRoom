import { Check, X } from "lucide-react";
import { motion } from "motion/react";

export function ToastNotification() {
  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
          x: 500,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          //   repeat: Infinity,
        }}
        className="  fixed top-2 right-2  bg-[#212421]    w-[16rem] h-[3.5rem]  rounded-lg px-4 flex items-center justify-between gap-4   "
      >
        <div className="  flex items-center justify-between gap-4  ">
          <div className=" bg-green-800/20 p-2  rounded-full ">
            <div className=" bg-green-800 p-1 rounded-full  ">
              <Check size={20} />
            </div>
          </div>

          <div>
            <h1 className=" text-lg  text-text-heading font-heading ">
              Logged In
            </h1>
            <p className=" text-sm text-text-body font-body ">Successfull!</p>
          </div>
        </div>

        <div>
          <X className=" cursor-pointer " />
        </div>
      </motion.div>
    </>
  );
}
