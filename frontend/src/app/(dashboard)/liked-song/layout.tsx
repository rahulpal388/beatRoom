export default function LikedSongLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>
        <div className=" mt-8 lg:hidden  flex w-full  items-center justify-center ">
          <p className=" font-semibold text-xl  ">Big Screen Only Page</p>
        </div>
        <div className=" max-lg:hidden">{children}</div>
      </div>
    </>
  );
}
