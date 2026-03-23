import { Button } from "@/ui/button";
import { Input } from "@/ui/input";

type MembersItemsType = {
  username: string;
  userId: string;
  admin: boolean;
};

const memberItems: MembersItemsType[] = [
  {
    username: "Rahul Pal",
    userId: "dUiw-ew",
    admin: true,
  },
  {
    username: "Rahul Pal",
    userId: "dUiw-ew",
    admin: false,
  },
  {
    username: "Rahul Pal",
    userId: "dUiw-ew",
    admin: false,
  },
  {
    username: "Rahul Pal",
    userId: "dUiw-ew",
    admin: false,
  },
  {
    username: "Rahul Pal",
    userId: "dUiw-ew",
    admin: false,
  },
  {
    username: "Rahul Pal",
    userId: "dUiw-ew",
    admin: false,
  },
  {
    username: "Rahul Pal",
    userId: "dUiw-ew",
    admin: false,
  },
];
export function RoomInfoCard() {
  return (
    <>
      <div>
        <div className=" flex gap-8 items-center justify-center ">
          <Input
            placeholder="Enter userId eg: B7P6bdTy ........"
            className=" w-full "
          />
          <Button btnType="Primary" className=" text-sm whitespace-nowrap h-8 ">
            Send Invite
          </Button>
        </div>
        <div className=" mt-4  ">
          <h1 className=" text-xl  ">Total 4 Members</h1>
          <div className=" overflow-y-scroll h-[14rem] ">
            {memberItems.map((items, idx) => (
              <MembersCards
                key={idx}
                userId={items.userId}
                username={items.username}
                admin={items.admin}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export function MembersCards({ userId, username, admin }: MembersItemsType) {
  return (
    <>
      <div className="hover:bg-card-hover px-4 py-2 flex items-center justify-between gap-4 ">
        <div className=" flex gap-4 ">
          <div className=" size-10 rounded-full bg-neutral-200  "></div>
          <div className="w-20">
            <h1 className=" text-lg w-full line-clamp-1 ">{username}</h1>
            <p className="text-xs w-full line-clamp-1 ">{userId}</p>
          </div>
        </div>
        <p
          className={`text-[10px] border-[1px]  h-fit px-1 rounded-full ${admin ? "bg-blue-600/30 border-blue-600 " : " border-primary bg-primary/30"}`}
        >
          {admin ? "Admin" : "Member"}
        </p>
        <Button btnType="Secondary" className=" text-xs ">
          Remove
        </Button>
      </div>
    </>
  );
}
