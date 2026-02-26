export default function MyLibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>
        <div className=" mt-8 max-lg:hidden  flex w-full  items-center justify-center ">
          <p className=" font-semibold text-xl  ">Mobile Only Page</p>
        </div>
        <div className=" lg:hidden">{children}</div>
      </div>
    </>
  );
}
