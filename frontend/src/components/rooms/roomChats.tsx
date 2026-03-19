import { formateDate } from "@/lib/formateDate";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";

const messages = [
  {
    senderId: "uqP8_-YO",
    sender: "Rahul Pal",
    roomId: "_l9qeSKT",
    message:
      "awsome, you will be felling very strong compare from previous self",
    createdAt: "2026-03-19T20:36:30.720Z",
  },
  {
    senderId: "uqP8_-YO",
    sender: "Rahul Pal",
    roomId: "_l9qeSKT",
    message: "how are you Rahul",
    createdAt: "2026-03-19T20:58:21.378Z",
  },
  {
    senderId: "uqP8_-YO",
    sender: "Rahul Pal",
    roomId: "_l9qeSKT",
    message: "😁",
    createdAt: "2026-03-19T21:02:32.105Z",
  },
];

export function RoomChats() {
  return (
    <>
      <div className=" flex flex-col  h-[20.5rem] w-full border-[1px] border-neutral-300/80 rounded-lg  ">
        <div className=" flex-1  p-2 ">
          <ul className=" flex flex-col gap-4  h-[17.5rem] overflow-y-scroll py-2 ">
            {messages.map((message) => (
              <li>
                <div className=" flex gap-2  items-center ">
                  <div className=" size-6 bg-green-700 rounded-full flex items-center justify-center  ">
                    {message.sender[0].toUpperCase()}
                  </div>
                  <h1 className="text-lg  font-semibold ">{message.sender}</h1>
                  <p className=" text-[10px] ">{`${formateDate(message.createdAt)}`}</p>
                </div>
                <p className=" text-sm pl-8  ">{message.message}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className=" h-12 w-full flex gap-4 items-center px-4  ">
          <Input placeholder="Enter the message........" className="w-full  " />
          <Button btnType="Primary" className=" h-8 ">
            Send
          </Button>
        </div>
      </div>
    </>
  );
}
