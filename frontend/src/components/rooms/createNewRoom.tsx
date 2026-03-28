import { createRoom } from "@/api/room/createRoom";
import { useAuth } from "@/context/authContext";
import { useModal } from "@/context/modalContext";
import { useToastNotification } from "@/context/toastNotificationContext";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { CloudUpload } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormDataType = {
  name: string;
};

export function CreateNewRoom() {
  const { removeModal } = useModal();
  const { currentUser } = useAuth();
  const { toastMessage } = useToastNotification();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormDataType>();

  const onSubmit: SubmitHandler<FormDataType> = async (data) => {
    if (currentUser) {
      const response = await createRoom({
        roomName: data.name,
        userId: currentUser.userId,
      });

      if (response) {
        toastMessage({
          message: "Room created",
          type: "success",
        });
      } else {
        toastMessage({
          message: "Error Creating room",
          type: "error",
        });
      }
    }
    removeModal();
  };
  return (
    <>
      <div className="   w-[24rem]  overflow-hidden  rounded-lg ">
        <h1 className=" text-xl py-2 px-4 bg-neutral-400 ">Create new Room</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" mt-4  px-4 py-2 flex flex-col gap-2  "
        >
          <div>
            <label
              htmlFor="name"
              className="text-xl font-heading text-text-heading cursor-pointer "
            >
              Enter Name
            </label>
            <Input
              id="name"
              placeholder="Enter room name......"
              className=" w-full mt-px "
              {...register("name", {
                required: { value: true, message: "Room name required" },
                maxLength: { value: 10, message: "Max length should be 10" },
              })}
            />
            <p className="text-red-500 text-xs">{errors.name?.message}</p>
          </div>
          <Button btnType="Primary" type="submit" className=" mt-4 w-full ">
            {isSubmitting ? "Creating........." : "Create"}
          </Button>
        </form>
      </div>
    </>
  );
}
