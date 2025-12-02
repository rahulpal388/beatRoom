export function SongPopover() {
  return (
    <>
      <div className="  w-[12rem]   py-2 bg-card rounded-lg flex flex-col  ">
        <button className=" hover:bg-bar text-lg hover:bg-card-hover py-1 cursor-pointer ">
          Save To Library
        </button>
        <button className=" hover:bg-bar text-lg hover:bg-card-hover py-1 cursor-pointer ">
          Play Song Now
        </button>
        <button className=" hover:bg-bar text-lg hover:bg-card-hover py-1 cursor-pointer ">
          Add To Queue
        </button>
        <button className=" hover:bg-bar text-lg hover:bg-card-hover py-1 cursor-pointer ">
          Add To Playlist
        </button>
        <button className=" hover:bg-bar text-lg hover:bg-card-hover py-1 cursor-pointer ">
          Song Details
        </button>
        <button className=" hover:bg-bar text-lg hover:bg-card-hover py-1 cursor-pointer ">
          More From album
        </button>
      </div>
    </>
  );
}
