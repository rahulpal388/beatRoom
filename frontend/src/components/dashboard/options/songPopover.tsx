export function SongPopover() {
  return (
    <>
      <div className=" absolute bottom-0 -right-20 z-40 w-[12rem]   px-4 py-2 bg-card rounded-lg flex flex-col gap-4 ">
        <button className=" hover:bg-bar text-lg  ">Save To Library</button>
        <button className=" hover:bg-bar text-lg  ">Play Song Now</button>
        <button className=" hover:bg-bar text-lg  ">Add To Queue</button>
        <button className=" hover:bg-bar text-lg  ">Add To Playlist</button>
        <button className=" hover:bg-bar text-lg  ">Song Details</button>
        <button className=" hover:bg-bar text-lg  ">More From album</button>
      </div>
    </>
  );
}
