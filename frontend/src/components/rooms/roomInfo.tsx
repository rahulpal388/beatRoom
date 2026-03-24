import { RoomInfoCard } from "./roomMembers";
import { Button } from "@/ui/button";

export function RoomInfo() {
  return (
    <>
      <div className=" w-[42rem] h-[24rem] overflow-hidden rounded-lg  ">
        <div className=" flex gap-4 items-center justify-between bg-neutral-300 px-4 py-2 ">
          <div className=" flex gap-2 items-center ">
            <div className=" size-10 rounded-full bg-neutral-600  "></div>
            <div>
              <h1 className=" text-2xl ">Rahul</h1>
              <p className=" text-xs ">dUiw-ew</p>
            </div>
          </div>
          <Button
            btnType="Secondary"
            className=" text-sm bg-red-500/90 h-8 w-fit "
          >
            Delete Group
          </Button>
        </div>
        <div className=" mt-4 py-2 px-4 ">
          <RoomInfoCard />
        </div>
      </div>
    </>
  );
}
