import { decodeHTML } from "@/lib/decodeHtml";

export function SongHorizontalContainer({
  children,
  title,
  className,
}: {
  children: React.ReactNode;
  title: string;
  className?: string;
}) {
  if (Array.isArray(children) && children.length === 0) {
    return null;
  }

  return (
    <>
      <div className={`flex flex-col gap-4 md:px-12 mb-4  ${className}`}>
        <h1 className=" font-semibold md:text-2xl text-xl line-clamp-1 max-md:px-4 max-w-[30rem]  ">
          More from {decodeHTML(title)}
        </h1>
        {children}
      </div>
    </>
  );
}
