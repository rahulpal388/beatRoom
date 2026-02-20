import { Check, X } from "lucide-react";
import { motion } from "motion/react";
import { AlertSvg } from "./alertSvg";

export function ToastNotification({
  name,
  type,
}: {
  name: string;
  type: "success" | "error";
}) {
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
        exit={{
          opacity: 0,
          x: 500,
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
        }}
        className="z-50  bg-[#212421]     h-[3.5rem]  rounded-lg px-4 flex items-center justify-between gap-4   "
      >
        <div className="  flex items-center justify-between gap-4  ">
          <div
            className={` ${type === "success" ? "bg-green-800/20" : "bg-red-800/20"
              } p-2  rounded-full `}
          >
            <div
              className={` ${type === "success" ? "bg-green-800" : "bg-red-800"
                } p-1 rounded-full flex items-center justify-center`}
            >
              {type === "success" ? (
                <Check size={20} />
              ) : (
                <AlertSvg size={20} />
              )}
            </div>
          </div>

          <div>
            <h1 className=" text-auto  text-text-heading font-heading ">
              {name}
            </h1>
            <p className=" text-sm text-text-body font-body ">
              {type === "success" ? "Successfull!" : "Error!"}
            </p>
          </div>
        </div>

        <div>
          <X className=" cursor-pointer " />
        </div>
      </motion.div>
    </>
  );
}
