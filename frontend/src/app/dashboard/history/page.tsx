import Link from "next/link";

export default function History() {
  return (
    <>
      <div className=" py-8 px-12 ">
        <h1 className=" text-4xl  ">History</h1>
        <div className=" mt-8 pb-4 border-b-[1px] border-neutral-100/10 ">
          <Link
            href={""}
            className="text-lg font-light h-[15rem] pb-4 border-b-[2px] border-neutral-700/60  "
          >
            Recently Played
          </Link>
        </div>

        <div className=" mt-4 grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-8 ">
          {/* song card */}
        </div>
      </div>
    </>
  );
}
