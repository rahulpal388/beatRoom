import { useModal } from "@/context/modalContext";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";

type FormDataType = {
  name: string;
};

export function CreateNewRoom() {
  const { removeModal } = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>();

  const onSubmit: SubmitHandler<FormDataType> = (data) => {
    alert(data.name);
    removeModal();
  };
  return (
    <>
      <div className="   w-[20rem] h-[12.5rem] overflow-hidden  rounded-lg ">
        <h1 className=" text-xl py-2 px-4 bg-neutral-400 ">Create new Room</h1>
        <form onSubmit={handleSubmit(onSubmit)} className=" mt-4  px-4 py-2 ">
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
          <Button btnType="Primary" type="submit" className=" mt-4 w-full ">
            Create
          </Button>
        </form>
      </div>
    </>
  );
}
