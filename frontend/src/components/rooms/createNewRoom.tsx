import { useModal } from "@/context/modalContext";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { CloudUpload } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormDataType = {
  name: string;
  profile: string;
};

export function CreateNewRoom() {
  const { removeModal } = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>();

  const onSubmit: SubmitHandler<FormDataType> = (data) => {
    console.log(data.name);
    console.log(data.profile);
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
          <div className=" h-20 w-full  ">
            <h2 className="text-xl font-heading text-text-heading">
              Room Image
            </h2>
            <label
              htmlFor="profile"
              className="  w-full h-full cursor-pointer "
            >
              <div className="mt-2 flex flex-col items-center justify-center w-full h-full border-[1px] border-primary rounded-lg">
                <Input
                  type="file"
                  accept="image/*"
                  id="profile"
                  className="hidden"
                  {...register("profile")}
                />

                <CloudUpload className=" stroke-[1px] size-8 " />
                <p>Upload profile image of room</p>
              </div>
            </label>
          </div>
          <div className=" mt-6 ">
            <Button btnType="Primary" type="submit" className=" mt-4 w-full ">
              Create
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
